// Allow importing CSS files as side-effect modules in TypeScript
declare module '*.css' {
  const content: { [className: string]: string } | string
  export default content
}

declare module '*.module.css' {
  const classes: { readonly [key: string]: string }
  export default classes
}

declare module '*.scss' {
  const content: { [className: string]: string } | string
  export default content
}
/* Allow importing CSS and asset files in TypeScript files (side-effect imports) */
declare module '*.css'
declare module '*.scss'
declare module '*.sass'
declare module '*.module.css'
declare module '*.module.scss'
declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.svg'
declare module '*.gif'

export {}
