import { FC, useState } from 'react';
import {
  useTheme,
  Tooltip,
  IconButton,
  styled,
  alpha,
  Paper,
} from '@mui/material';
import Highlight, { defaultProps } from 'prism-react-renderer';
import darkCodeTheme from 'prism-react-renderer/themes/vsDark';
import lightCodeTheme from 'prism-react-renderer/themes/vsLight';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';

const CopyButton = styled(IconButton)({
  position: 'absolute',
  top: '0.25rem',
  right: '0.25rem',
});

export const SampleCodeSnippet: FC<any> = (props) => {
  const theme = useTheme();
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(props.children);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 3000);
  };

  if (!props.className) {
    return (
      <code
        style={{
          backgroundColor: alpha(theme.palette.primary.main, 0.1),
          padding: '4px',
          margin: '0 0.5ch',
        }}
        {...props}
      />
    );
  }

  return (
    <Paper
      elevation={3}
      sx={{
        boxShadow: props.enableCopyButton === false ? 'none' : undefined,
        backgroundImage: 'none',
        backgroundColor: 'transparent',
      }}
    >
      <Highlight
        {...defaultProps}
        code={props.children}
        language={props.className.replace(/language-/, '')}
        theme={theme.palette.mode === 'dark' ? darkCodeTheme : lightCodeTheme}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <div
            style={{
              position: 'relative',
              margin: props.enableCopyButton !== false ? '2rem auto' : 0,
              fontSize: '1.2em',
            }}
          >
            {props.enableCopyButton !== false && (
              <Tooltip arrow title={isCopied ? 'Copied!' : 'Copy Code'}>
                <CopyButton onClick={handleCopy}>
                  {isCopied ? <LibraryAddCheckIcon /> : <ContentCopyIcon />}
                </CopyButton>
              </Tooltip>
            )}
            <pre
              className={className}
              style={{
                ...style,
                minHeight: '3rem',
                overflowX: 'auto',
                padding: '1rem 2.5rem 0 1rem',
                ...props?.style,
              }}
            >
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line, key: i })}>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token, key })} />
                  ))}
                </div>
              ))}
            </pre>
          </div>
        )}
      </Highlight>
    </Paper>
  );
};