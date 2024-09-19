import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeSanitize from "rehype-sanitize";

// Define the props for the component
interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  return (
    <ReactMarkdown
      children={content}
      rehypePlugins={[rehypeSanitize]} // Enables sanitization and raw HTML processing
      components={{
        // Customize how links are rendered
        a: ({ node, ...props }) => (
          <a
            {...props}
            target="_blank"
            rel="noopener noreferrer"
            // Optionally, add styles or classes
            className="text-blue-600 hover:underline"
          >
            {props.children}
          </a>
        ),
        // You can customize other elements here if needed
      }}
    />
  );
};

export default MarkdownRenderer;
