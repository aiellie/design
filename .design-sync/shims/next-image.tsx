// Minimal next/image shim for the design-sync bundle/preview builds — the
// real next/image needs the Next.js runtime (`process`, image optimizer).
// Renders a plain <img>; static imports pass through their .src. Wired via
// the paths map in tsconfig.bundle.json; the app itself never sees this.
// @ts-nocheck — compiled by esbuild only, never type-checked.
import * as React from "react"

const Image = React.forwardRef(function NextImageShim(props: any, ref: any) {
  const {
    src, alt, width, height, fill, sizes, quality, priority, placeholder,
    blurDataURL, loader, unoptimized, onLoadingComplete, style, ...rest
  } = props
  const url = typeof src === "object" && src !== null ? src.src : src
  const s = fill
    ? { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", ...style }
    : style
  return (
    <img
      ref={ref}
      src={url}
      alt={alt ?? ""}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      style={s}
      {...rest}
    />
  )
})

export default Image
