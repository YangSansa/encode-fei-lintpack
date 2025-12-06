// index.d.ts
declare interface MarkdownlintConfig {
  /** JSON Schema 定义 */
  $schema?: "https://raw.githubusercontent.com/DavidAnson/markdownlint/main/schema/markdownlint-config-schema.json";
  
  /** 是否启用所有默认规则 */
  default?: boolean;
  
  /** 无序列表样式 */
  "ul-style"?: {
    style: "asterisk" | "plus" | "dash" | "consistent";
  };
  
  /** 禁止尾部空格 */
  "no-trailing-spaces"?: boolean | {
    br_spaces?: number;
    list_item_empty_lines?: boolean;
    strict?: boolean;
  };
  
  /** 列表标记后空格 */
  "list-marker-space"?: boolean;
  
  /** 行长度限制 */
  "line-length"?: boolean | {
    line_length?: number;
    heading_line_length?: number;
    code_block_line_length?: number;
    code_blocks?: boolean;
    strict?: boolean;
    tables?: boolean;
  };
  
  /** 禁止内联 HTML */
  "no-inline-html"?: boolean | {
    allowed_elements?: string[];
  };
  
  /** 禁止重复标题 */
  "no-duplicate-header"?: boolean | {
    siblings_only?: boolean;
  };
  
  /** 专有名词检查 */
  "proper-names"?: boolean | {
    names?: string[];
    code_blocks?: boolean;
    html_elements?: boolean;
    ignore?: string[];
  };
  
  /** 允许其他 markdownlint 规则 */
  [ruleName: string]: // boolean | number | string | null | Array<any> | { [key: string]: any } | undefined;联合类型
    | boolean
    | number
    | string
    | null
    | Array<any>
    | { [key: string]: any }
    | undefined;
}

declare const config: MarkdownlintConfig;

export = config;