# Writely - Advanced Markdown Blog Editor

![Writely](public/next.svg)

Writely is a sophisticated, real-time markdown editor designed for creating and optimizing blog content with built-in SEO analysis capabilities.

## ✨ Features

### 📝 Rich Text Editor

- **Dual Editing Modes**: Switch between Visual and Markdown editing
- **Real-time Preview**: Live preview of your content
- **Rich Formatting Options**:
  - Text styling (Bold, Italic)
  - Headers (H1, H2)
  - Lists
  - Code blocks
  - Blockquotes
  - Tables with advanced controls
- **Image Support**: Upload and embed images directly
- **Undo/Redo**: Full history management

### 🔄 Auto-Save & Recovery

- Automatic content saving every 30 seconds
- Manual save with Ctrl+S / Cmd+S shortcuts
- Unsaved changes indicator
- Session state persistence

### 📊 SEO Analysis & Optimization

- Real-time SEO score calculation
- Keyword density analysis
- Readability scoring
- Content structure analysis:
  - Heading hierarchy validation
  - Internal linking suggestions
  - Meta tags verification
- Reading time estimation
- Automated SEO recommendations

### 📈 Content Metrics

- Word count
- Character count
- Keyword density tracking
- Internal links analysis
- Content structure validation

### 🎨 Modern UI/UX

- Clean, minimalist interface
- Dark/Light theme support
- Premium animations and transitions
- Responsive design
- Context-aware tooltips
- Beautiful gradient backgrounds

### 💾 Data Management

- State management using Zustand
- Front matter support for meta data
- Content versioning
- Export capabilities

## 🛠 Technical Architecture

### Frontend Stack

- Next.js for the framework
- TipTap for the rich text editor
- Radix UI for accessible components
- Tailwind CSS for styling
- Zustand for state management

### Key Components

- `Editor`: Core editing interface with auto-save
- `MenuBar`: Rich text controls and formatting options
- `SEOAnalyzer`: Real-time content analysis
- `ImageUploadDialog`: Image management
- `TableControls`: Advanced table editing

### Project Structure

```
src/
├── app/              # Next.js app directory
├── components/       # React components
│   ├── editor/      # Editor-specific components
│   └── ui/          # Reusable UI components
├── hooks/           # Custom React hooks
├── store/           # State management
├── types/           # TypeScript definitions
└── utils/           # Utility functions
```

## 🚀 Getting Started

1. **Installation**

   ```bash
   pnpm install
   ```

2. **Development**

   ```bash
   pnpm dev
   ```

3. **Build**
   ```bash
   pnpm build
   ```

## 🎯 Future Enhancements

- [ ] AI-powered content suggestions
- [ ] Export to multiple formats
- [ ] Collaborative editing
- [ ] Version history
- [ ] Custom templates
- [ ] Enhanced SEO tools

## 📝 License

MIT © Valentine Chahul

---

Built with ❤️ using Next.js and TypeScript
