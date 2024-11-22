import { useState } from 'react';
import { Lock, Globe, X, Upload } from 'lucide-react';

interface CreateGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateGroupModal = ({ isOpen, onClose }: CreateGroupModalProps) => {
  const [loading, setLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    privacy: 'public' as 'public' | 'private',
    avatar: null as File | null,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, avatar: file }));
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      privacy: 'public',
      avatar: null,
    });
    setPreviewUrl('');
    setErrors({});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Validation
      const newErrors: Record<string, string> = {};
      if (!formData.name.trim()) {
        newErrors.name = 'Group name is required';
      }
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }

      // TODO: Implement your group creation logic here
      
      onClose();
      resetForm();
    } catch (error) {
      console.error('Error creating group:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-slate-800 border border-white-light dark:border-slate-700 rounded-lg p-6 w-full max-w-md m-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold dark:text-white">Create New Group</h2>
          <button
            onClick={() => {
              onClose();
              resetForm();
            }}
            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image Upload */}
          <div className="flex justify-center">
            <div className="relative w-32 h-32">
              <div className="w-full h-full rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden">
                {previewUrl ? (
                  <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Upload className="text-gray-400" size={32} />
                  </div>
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
          </div>

          {/* Group Name */}
          <div>
            <input
              type="text"
              value={formData.name}
              onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full p-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
              placeholder="Group Name"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          {/* Description */}
          <div>
            <textarea
              value={formData.description}
              onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full p-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
              placeholder="Group Description"
              rows={3}
            />
          </div>

          {/* Privacy Setting */}
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                checked={formData.privacy === 'public'}
                onChange={() => setFormData(prev => ({ ...prev, privacy: 'public' }))}
                className="text-primary"
              />
              <span className="flex items-center gap-1">
                <Globe size={16} /> Public
              </span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                checked={formData.privacy === 'private'}
                onChange={() => setFormData(prev => ({ ...prev, privacy: 'private' }))}
                className="text-primary"
              />
              <span className="flex items-center gap-1">
                <Lock size={16} /> Private
              </span>
            </label>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={() => {
                onClose();
                resetForm();
              }}
              className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50 
                dark:border-gray-600 dark:hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 bg-primary text-white rounded-lg 
                hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating...' : 'Create Group'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateGroupModal;