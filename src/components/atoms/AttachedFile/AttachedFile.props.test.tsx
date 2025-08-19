import React from 'react';
import { describe, it, expect } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { AttachedFile } from './AttachedFile';

function renderHtml(element: React.ReactElement) {
  const theme = createTheme();
  return renderToStaticMarkup(
    <ThemeProvider theme={theme}>{element}</ThemeProvider>
  );
}

describe('AttachedFile - props', () => {
  it('exports component', () => {
    expect(AttachedFile).toBeDefined();
    expect(typeof AttachedFile).toBe('function');
  });

  it('renders defaults when props are omitted', () => {
    const html = renderHtml(<AttachedFile />);
    expect(html.includes('file...')).toBe(true);
    expect(html.includes('jpeg')).toBe(true);
    expect(html.includes('aria-label="Remove file..."')).toBe(true);
    // title attribute on file name Typography
    expect(html.includes('title="file..."')).toBe(true);
  });

  it('renders provided fileName and fileType', () => {
    const html = renderHtml(<AttachedFile fileName="report.pdf" fileType="pdf" />);
    expect(html.includes('report.pdf')).toBe(true);
    expect(html.includes('pdf')).toBe(true);
    expect(html.includes('aria-label="Remove report.pdf"')).toBe(true);
    expect(html.includes('title="report.pdf"')).toBe(true);
  });

  it('accepts onRemove prop', () => {
    const html = renderHtml(
      <AttachedFile fileName="x.png" fileType="png" onRemove={() => {}} />
    );
    expect(html.includes('x.png')).toBe(true);
    expect(html.includes('png')).toBe(true);
    expect(html.includes('aria-label="Remove x.png"')).toBe(true);
  });

  it('onRemove must be a function', () => {
    // @ts-expect-error onRemove should be a function
    const html = renderHtml(<AttachedFile onRemove={123} />);
    expect(typeof html).toBe('string');
  });
});


