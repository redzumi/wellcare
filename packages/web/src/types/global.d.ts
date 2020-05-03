// fallback from typed-css-modules-loader
declare module '*.styl' {
  interface IClassNames {
    [className: string]: string;
  }
  const classNames: IClassNames;
  export = classNames;
}
