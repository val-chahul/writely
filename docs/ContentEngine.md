import React, { useState, useEffect } from 'react';
import {
AlertCircle,
Link,
Youtube,
Hash,
FileText,
Loader2,
Check,
X
} from 'lucide-react';
import {
Alert,
AlertDescription
} from '@/components/ui/alert';

const ContentGenerator = () => {
const [formData, setFormData] = useState({
url: '',
videoUrl: '',
keywords: [],
topic: '',
content: ''
});
const [loading, setLoading] = useState(false);
const [errors, setErrors] = useState({});
const [urlPreview, setUrlPreview] = useState(null);
const [videoPreview, setVideoPreview] = useState(null);
const [keywordSuggestions] = useState([
'AI', 'Machine Learning', 'Web Development', 'Design', 'Technology'
]);
const [wordCount, setWordCount] = useState(0);
const [savedStatus, setSavedStatus] = useState('saved');

// URL validation
const validateUrl = (url) => {
try {
new URL(url);
return true;
} catch {
return false;
}
};

// Handle URL input
const handleUrlChange = async (e) => {
const url = e.target.value;
setFormData(prev => ({ ...prev, url }));

    if (validateUrl(url)) {
      setLoading(true);
      try {
        // Simulated API call for title fetching
        await new Promise(resolve => setTimeout(resolve, 800));
        setUrlPreview({ title: 'Sample Article Title' });
        setErrors(prev => ({ ...prev, url: null }));
      } catch (error) {
        setErrors(prev => ({ ...prev, url: 'Failed to fetch URL preview' }));
      }
      setLoading(false);
    } else if (url) {
      setErrors(prev => ({ ...prev, url: 'Please enter a valid URL' }));
    }

};

// Handle YouTube input
const handleVideoChange = async (e) => {
const videoUrl = e.target.value;
setFormData(prev => ({ ...prev, videoUrl }));

    if (videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be')) {
      setLoading(true);
      try {
        // Simulated API call for video info
        await new Promise(resolve => setTimeout(resolve, 800));
        setVideoPreview({
          title: 'Sample Video Title',
          thumbnail: '/api/placeholder/320/180'
        });
        setErrors(prev => ({ ...prev, videoUrl: null }));
      } catch (error) {
        setErrors(prev => ({ ...prev, videoUrl: 'Failed to fetch video info' }));
      }
      setLoading(false);
    } else if (videoUrl) {
      setErrors(prev => ({ ...prev, videoUrl: 'Please enter a valid YouTube URL' }));
    }

};

// Handle keywords
const handleKeywordAdd = (keyword) => {
if (!formData.keywords.includes(keyword)) {
setFormData(prev => ({
...prev,
keywords: [...prev.keywords, keyword]
}));
}
};

const handleKeywordRemove = (keyword) => {
setFormData(prev => ({
...prev,
keywords: prev.keywords.filter(k => k !== keyword)
}));
};

// Handle content changes with autosave
const handleContentChange = (e) => {
const content = e.target.value;
setFormData(prev => ({ ...prev, content }));
setSavedStatus('saving');
setWordCount(content.trim().split(/\s+/).length);

    // Debounced autosave
    setTimeout(() => {
      setSavedStatus('saved');
    }, 1000);

};

// Keyboard shortcuts
useEffect(() => {
const handleShortcut = (e) => {
if (e.ctrlKey || e.metaKey) {
switch(e.key) {
case 's':
e.preventDefault();
// Save functionality
break;
case 'b':
e.preventDefault();
// Bold text
break;
default:
break;
}
}
};

    window.addEventListener('keydown', handleShortcut);
    return () => window.removeEventListener('keydown', handleShortcut);

}, []);

return (
<div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4 md:p-8">
<div className="max-w-4xl mx-auto">
<div className="backdrop-blur-lg bg-white/80 rounded-2xl shadow-xl p-6 md:p-8 space-y-8">
{/_ Header _/}
<div className="space-y-2">
<h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
AI Content Generator
</h1>
<p className="text-gray-600">
Transform your ideas into engaging content
</p>
</div>

          {/* URL Input */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Existing Content URL
            </label>
            <div className="relative">
              <input
                type="url"
                value={formData.url}
                onChange={handleUrlChange}
                placeholder="https://example.com/article"
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all pl-10"
              />
              <Link className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
              {loading && <Loader2 className="absolute right-3 top-2.5 animate-spin text-blue-500 w-5 h-5" />}
            </div>
            {urlPreview && (
              <div className="text-sm text-gray-600 pl-2 border-l-2 border-blue-500">
                {urlPreview.title}
              </div>
            )}
            {errors.url && (
              <Alert variant="destructive" className="mt-2">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{errors.url}</AlertDescription>
              </Alert>
            )}
          </div>

          {/* YouTube Input */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              YouTube Video
            </label>
            <div className="relative">
              <input
                type="url"
                value={formData.videoUrl}
                onChange={handleVideoChange}
                placeholder="https://youtube.com/watch?v=..."
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all pl-10"
              />
              <Youtube className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
            </div>
            {videoPreview && (
              <div className="mt-2 rounded-lg overflow-hidden">
                <img
                  src={videoPreview.thumbnail}
                  alt={videoPreview.title}
                  className="w-full h-40 object-cover"
                />
                <div className="text-sm text-gray-600 mt-1">
                  {videoPreview.title}
                </div>
              </div>
            )}
          </div>

          {/* Keywords */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Keywords
            </label>
            <div className="relative">
              <div className="flex flex-wrap gap-2 p-2 rounded-lg border border-gray-200 min-h-[2.5rem]">
                {formData.keywords.map(keyword => (
                  <span
                    key={keyword}
                    className="inline-flex items-center px-2 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
                  >
                    {keyword}
                    <button
                      onClick={() => handleKeywordRemove(keyword)}
                      className="ml-1 hover:text-blue-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </span>
                ))}
              </div>
              <Hash className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {keywordSuggestions.map(suggestion => (
                <button
                  key={suggestion}
                  onClick={() => handleKeywordAdd(suggestion)}
                  className="px-3 py-1 text-sm rounded-full border border-gray-200 hover:border-blue-500 hover:text-blue-500 transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>

          {/* Content Input */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Content
            </label>
            <div className="relative">
              <textarea
                value={formData.content}
                onChange={handleContentChange}
                placeholder="Start writing your content..."
                rows={6}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all pl-10 resize-y"
              />
              <FileText className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
            </div>
            <div className="flex justify-between text-sm text-gray-500">
              <span>{wordCount} words</span>
              <span className="flex items-center gap-1">
                {savedStatus === 'saving' ? (
                  <>
                    <Loader2 className="animate-spin w-4 h-4" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4 text-green-500" />
                    Saved
                  </>
                )}
              </span>
            </div>
          </div>

          {/* Submit Button */}
          <button
            className="w-full py-2 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:opacity-90 transition-opacity font-medium"
          >
            Generate Content
          </button>
        </div>
      </div>
    </div>

);
};

export default ContentGenerator;
