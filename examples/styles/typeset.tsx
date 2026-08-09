export function TypesetExample() {
  return (
    <div className="typeset typeset-docs max-w-[33em]">
      <h1>Writing component docs</h1>
      <p>
        Everything inside this container is styled by{" "}
        <a href="https://ui.shadcn.com/docs/typeset">typeset</a> — headings,
        lists, tables, blockquotes, and code get their typography from the
        wrapper, with <strong>no classes on the content itself</strong>.
      </p>
      <h2>Structure</h2>
      <p>Every component page follows the same shape:</p>
      <ol>
        <li>A one-sentence summary of what the component is for.</li>
        <li>A live example with realistic content.</li>
        <li>Props and variants, documented in a table.</li>
      </ol>
      <p>Keep examples honest — they should read like product UI, not like</p>
      <ul>
        <li>
          lorem ipsum, <em>or</em>
        </li>
        <li>
          <code>foo</code> and <code>bar</code> placeholders.
        </li>
      </ul>
      <blockquote>
        <p>
          Write the summary before the example. If you can&apos;t say what the
          component is for in one sentence, the component is doing too much.
        </p>
      </blockquote>
      <h2>Variants</h2>
      <table>
        <thead>
          <tr>
            <th>Variant</th>
            <th>Use for</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Default</td>
            <td>The primary action on a surface.</td>
          </tr>
          <tr>
            <td>Secondary</td>
            <td>Supporting actions next to a primary one.</td>
          </tr>
          <tr>
            <td>Ghost</td>
            <td>Rows of repeated actions where chrome adds noise.</td>
          </tr>
        </tbody>
      </table>
      <h3>Usage</h3>
      <p>
        Wrap any rendered markdown in the container. Tune it per surface with
        variables like <code>--typeset-size</code> and{" "}
        <code>--typeset-flow</code>.
      </p>
      <pre>
        <code>{`<div className="typeset typeset-docs max-w-[33em]">
  {content}
</div>`}</code>
      </pre>
      <hr />
      <p>
        Press <kbd>⌘</kbd> <kbd>K</kbd> to search the docs. Embedded
        components can opt out with the <code>not-typeset</code> class.
      </p>
    </div>
  )
}
