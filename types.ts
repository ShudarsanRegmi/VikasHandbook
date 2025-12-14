import React from 'react';

export enum PageType {
  COVER = 'COVER',
  TOC = 'TOC',
  TEXT = 'TEXT',
  GALLERY = 'GALLERY',
  BACK_COVER = 'BACK_COVER',
  CLOSING = 'CLOSING'
}

export interface PageContent {
  id: string;
  type: PageType;
  title?: string;
  subtitle?: string;
  body?: string | React.ReactNode;
  quote?: string;
  warning?: string;
  listItems?: string[];
  images?: string[];
}