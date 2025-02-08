pnpm build

> writely@0.1.0 build /Users/valchahul/webdev/writely
> next build

▲ Next.js 15.1.6

Creating an optimized production build ...
✓ Compiled successfully

Failed to compile.

./src/app/page.tsx
11:10 Error: 'Input' is defined but never used. @typescript-eslint/no-unused-vars
12:10 Error: 'Label' is defined but never used. @typescript-eslint/no-unused-vars
24:25 Error: 'setTargetKeyword' is assigned a value but never used. @typescript-eslint/no-unused-vars
27:10 Error: 'metaDescription' is assigned a value but never used. @typescript-eslint/no-unused-vars
27:27 Error: 'setMetaDescription' is assigned a value but never used. @typescript-eslint/no-unused-vars
44:9 Error: 'analyzeSEOContent' is assigned a value but never used. @typescript-eslint/no-unused-vars

./src/components/editor/Editor.tsx
13:11 Error: 'theme' is assigned a value but never used. @typescript-eslint/no-unused-vars
31:16 Error: 'error' is defined but never used. @typescript-eslint/no-unused-vars

./src/components/editor/GlobalMarkdownDialog.tsx
8:3 Error: 'DialogFooter' is defined but never used. @typescript-eslint/no-unused-vars

./src/components/editor/ImageUploadDialog.tsx
63:15 Warning: Using `<img>` could result in slower LCP and higher bandwidth. Consider using `<Image />` from `next/image` or a custom image loader to automatically optimize images. This may incur additional usage or cost from your provider. See: https://nextjs.org/docs/messages/no-img-element @next/next/no-img-element

./src/components/editor/Toolbar.tsx
18:3 Error: 'AlignLeft' is defined but never used. @typescript-eslint/no-unused-vars

./src/components/editor/types.ts
15:40 Error: Unexpected any. Specify a different type. @typescript-eslint/no-explicit-any
16:36 Error: Unexpected any. Specify a different type. @typescript-eslint/no-explicit-any

./src/components/ui/input.tsx
4:18 Error: An interface declaring no members is equivalent to its supertype. @typescript-eslint/no-empty-object-type

./src/components/ui/textarea.tsx
4:18 Error: An interface declaring no members is equivalent to its supertype. @typescript-eslint/no-empty-object-type
