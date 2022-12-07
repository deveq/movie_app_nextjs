import ReactMarkdown from 'react-markdown';
import Seo from './Seo';
import { useEffect, useState } from 'react';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import styles from './about.module.css';

const About = () => {
  const [content, setContent] = useState();
  useEffect(() => {
    (async () => {
      const response = await fetch(
        'https://raw.githubusercontent.com/deveq/movie_app_nextjs/0fc1899c51495f1b307ee74df0411ef5123cf6d6/README.md',
      );
      const result = await response.text();
      setContent(result);
    })();
  }, []);
  return (
    <div className={styles.container}>
      <Seo title="About" />
      <h1>About</h1>
      {content && (
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            code({ node, inline, className, children, ...props }) {
              return !inline ? (
                <SyntaxHighlighter
                  language={'javascript'}
                  PreTag="div"
                  {...props}
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
          }}
        >
          {content}
        </ReactMarkdown>
      )}
    </div>
  );
};

export default About;
