
import React, { useState } from 'react';
import { X, Upload, Camera, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useApp } from '@/contexts/AppContext';
import { Child } from '@/types';
import { books } from '@/data/books';
import { editImage } from '@/services/runway';
import { toast } from '@/hooks/use-toast';

interface AddChildModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddChildModal: React.FC<AddChildModalProps> = ({ isOpen, onClose }) => {
  const { selectedChild, setSelectedChild } = useApp();
  const [formData, setFormData] = useState({
    name: selectedChild?.name || '',
    pronouns: selectedChild?.pronouns || '',
    favoriteColor: selectedChild?.favoriteColor || '',
    photo: selectedChild?.photo || ''
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      toast({
        title: "Name required",
        description: "Please enter your child's name.",
        variant: "destructive"
      });
      return;
    }

    const newChild: Child = {
      id: Date.now().toString(),
      name: formData.name.trim(),
      pronouns: formData.pronouns || 'they/them',
      favoriteColor: formData.favoriteColor || 'blue',
      photo: formData.photo
    };

    try {
      setLoading(true);
      if (formData.photo) {
        toast({ title: 'Generating images...', description: 'Personalizing your books. This may take a moment.' });

        const personalizedCovers: { [key: string]: string } = {};
        const personalizedPages: { [key: string]: string[] } = {};

        for (const book of books) {
          try {
            const cover = await editImage(formData.photo, book.cover);
            personalizedCovers[book.id] = cover;

            const pages = await Promise.all(
              book.demoPages.map(page => editImage(formData.photo!, page))
            );
            personalizedPages[book.id] = pages;
          } catch (err) {
            console.error('Runway generation failed', err);
          }
        }

        newChild.personalizedCovers = personalizedCovers;
        newChild.personalizedPages = personalizedPages;
        newChild.processedPhoto = formData.photo;
      }

      setSelectedChild(newChild);
      toast({
        title: 'Success!',
        description: `All books now feature ${newChild.name}. Ready to start their adventure!`,
      });
      onClose();
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to personalize images.';
      toast({ title: 'Error', description: message, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData(prev => ({ ...prev, photo: event.target?.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-md">
        <div className="relative">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <Heart className="w-6 h-6 text-red-500" />
              <h2 className="text-2xl font-bold text-gray-800 font-nunito">
                Add Your Little Hero
              </h2>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Photo Upload */}
            <div className="text-center">
              <div className="relative inline-block">
                {formData.photo ? (
                  <img
                    src={formData.photo}
                    alt="Child photo"
                    className="w-24 h-24 rounded-full object-cover border-4 border-memo-peach"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-memo-cream border-4 border-memo-peach flex items-center justify-center">
                    <Camera className="w-8 h-8 text-gray-400" />
                  </div>
                )}
                <label htmlFor="photo-upload" className="absolute bottom-0 right-0 bg-orange-500 text-white rounded-full p-1 cursor-pointer hover:bg-orange-600 transition-colors">
                  <Upload className="w-4 h-4" />
                </label>
                <input
                  id="photo-upload"
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Add a photo (optional)
              </p>
            </div>

            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Child's Name *
              </label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter your child's name"
                className="w-full"
                required
              />
            </div>

            {/* Pronouns */}
            <div>
              <label htmlFor="pronouns" className="block text-sm font-medium text-gray-700 mb-1">
                Pronouns
              </label>
              <select
                id="pronouns"
                value={formData.pronouns}
                onChange={(e) => setFormData(prev => ({ ...prev, pronouns: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="they/them">they/them</option>
                <option value="she/her">she/her</option>
                <option value="he/him">he/him</option>
              </select>
            </div>

            {/* Favorite Color */}
            <div>
              <label htmlFor="color" className="block text-sm font-medium text-gray-700 mb-1">
                Favorite Color
              </label>
              <select
                id="color"
                value={formData.favoriteColor}
                onChange={(e) => setFormData(prev => ({ ...prev, favoriteColor: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="red">Red</option>
                <option value="blue">Blue</option>
                <option value="green">Green</option>
                <option value="purple">Purple</option>
                <option value="pink">Pink</option>
                <option value="yellow">Yellow</option>
                <option value="orange">Orange</option>
                <option value="rainbow">Rainbow</option>
              </select>
            </div>

            {/* Benefits */}
            <div className="bg-memo-cream p-4 rounded-xl">
              <h3 className="font-semibold text-gray-800 mb-2 font-nunito">What happens next?</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>✨ Your child becomes the star of every story</li>
                <li>📚 Preview pages automatically update with their name</li>
                <li>🎯 Personalized just for them</li>
                <li>💝 Create lasting memories together</li>
              </ul>
            </div>

            {/* Buttons */}
            <div className="flex space-x-3">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white"
              >
                {loading ? 'Processing...' : selectedChild ? 'Update' : 'Save'} Profile
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddChildModal;
