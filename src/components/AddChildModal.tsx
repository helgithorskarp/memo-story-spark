
import React, { useState } from 'react';
import { Upload, Camera, Heart, User, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useApp } from '@/contexts/AppContext';
import { Child } from '@/types';
import { books } from '@/data/books';
import { removeBackground, loadImage } from '@/services/backgroundRemoval';
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
    childPhoto: selectedChild?.photo || '',
    teddyPhoto: selectedChild?.teddyPhoto || ''
  });

  const [loading, setLoading] = useState(false);
  const [processingChild, setProcessingChild] = useState(false);
  const [processingTeddy, setProcessingTeddy] = useState(false);

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
      photo: formData.childPhoto,
      teddyPhoto: formData.teddyPhoto
    };

    try {
      setLoading(true);
      if (formData.childPhoto || formData.teddyPhoto) {
        toast({ 
          title: 'Creating personalized covers...', 
          description: 'This will just take a moment.' 
        });

        // Process the images for personalized covers
        const personalizedCovers: { [key: string]: string } = {};
        const personalizedPages: { [key: string]: string[] } = {};

        // Use child photo for all book covers if available
        if (formData.childPhoto) {
          personalizedCovers['1'] = formData.childPhoto;
        }

        // For demo pages, combine child and teddy photos if available
        for (const book of books) {
          const pages = [];
          if (formData.childPhoto) pages.push(formData.childPhoto);
          if (formData.teddyPhoto) pages.push(formData.teddyPhoto);
          if (formData.childPhoto) pages.push(formData.childPhoto); // Fill remaining slots
          personalizedPages[book.id] = pages.slice(0, 3); // Limit to 3 pages
        }

        newChild.personalizedCovers = personalizedCovers;
        newChild.personalizedPages = personalizedPages;
        newChild.processedPhoto = formData.childPhoto;
      }

      setSelectedChild(newChild);
      toast({
        title: 'Success!',
        description: `${newChild.name} is now the star of the story!`,
      });
      onClose();
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to create profile.';
      toast({ title: 'Error', description: message, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const handleChildPhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        setProcessingChild(true);
        toast({
          title: 'Processing photo...',
          description: 'Preparing your child\'s photo for the story.',
        });

        const imageElement = await loadImage(file);
        const processedBlob = await removeBackground(imageElement);
        
        const reader = new FileReader();
        reader.onload = (event) => {
          setFormData(prev => ({ ...prev, childPhoto: event.target?.result as string }));
          toast({
            title: 'Photo ready!',
            description: 'Your child is ready to star in their book.',
          });
        };
        reader.readAsDataURL(processedBlob);
        
      } catch (error) {
        console.error('Error processing child photo:', error);
        toast({
          title: 'Upload failed',
          description: 'Could not process the photo. Please try again.',
          variant: 'destructive'
        });
      } finally {
        setProcessingChild(false);
      }
    }
  };

  const handleTeddyPhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        setProcessingTeddy(true);
        toast({
          title: 'Processing teddy photo...',
          description: 'Getting teddy ready for the adventure.',
        });

        const imageElement = await loadImage(file);
        const processedBlob = await removeBackground(imageElement);
        
        const reader = new FileReader();
        reader.onload = (event) => {
          setFormData(prev => ({ ...prev, teddyPhoto: event.target?.result as string }));
          toast({
            title: 'Teddy ready!',
            description: 'Teddy is ready to join the story.',
          });
        };
        reader.readAsDataURL(processedBlob);
        
      } catch (error) {
        console.error('Error processing teddy photo:', error);
        toast({
          title: 'Upload failed',
          description: 'Could not process the teddy photo. Please try again.',
          variant: 'destructive'
        });
      } finally {
        setProcessingTeddy(false);
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent 
        className="max-w-2xl p-0 bg-white border-0 shadow-xl"
        aria-describedby="add-child-description"
      >
        <div className="p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
              <User className="w-8 h-8 text-orange-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Add Your Child
            </h2>
            <p id="add-child-description" className="text-gray-600">
              Create a personalized story starring your little one
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Input */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Child's Name *
              </label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter your child's name"
                className="w-full h-12 text-base"
                required
              />
            </div>

            {/* Photo Uploads */}
            <div className="grid grid-cols-2 gap-6">
              {/* Child Photo */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Child Photo
                </label>
                <div className="relative">
                  {formData.childPhoto ? (
                    <div className="relative group">
                      <img
                        src={formData.childPhoto}
                        alt="Child photo"
                        className="w-full h-32 object-cover rounded-lg border-2 border-gray-200"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 rounded-lg transition-all duration-200 flex items-center justify-center">
                        <Camera className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                      </div>
                    </div>
                  ) : (
                    <div className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center hover:border-gray-400 transition-colors">
                      <Camera className="w-6 h-6 text-gray-400 mb-1" />
                      <span className="text-xs text-gray-500">Add photo</span>
                    </div>
                  )}
                  
                  {processingChild && (
                    <div className="absolute inset-0 bg-white bg-opacity-90 rounded-lg flex items-center justify-center">
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-orange-600 border-t-transparent rounded-full animate-spin"></div>
                        <span className="text-sm text-gray-600">Processing...</span>
                      </div>
                    </div>
                  )}
                  
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleChildPhotoUpload}
                    disabled={processingChild}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1 flex items-center">
                  <Sparkles className="w-3 h-3 mr-1" />
                  Background automatically removed
                </p>
              </div>

              {/* Teddy Photo */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Teddy Bear (Optional)
                </label>
                <div className="relative">
                  {formData.teddyPhoto ? (
                    <div className="relative group">
                      <img
                        src={formData.teddyPhoto}
                        alt="Teddy bear photo"
                        className="w-full h-32 object-cover rounded-lg border-2 border-gray-200"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 rounded-lg transition-all duration-200 flex items-center justify-center">
                        <Camera className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                      </div>
                    </div>
                  ) : (
                    <div className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center hover:border-gray-400 transition-colors">
                      <Heart className="w-6 h-6 text-gray-400 mb-1" />
                      <span className="text-xs text-gray-500">Add teddy</span>
                    </div>
                  )}
                  
                  {processingTeddy && (
                    <div className="absolute inset-0 bg-white bg-opacity-90 rounded-lg flex items-center justify-center">
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-orange-600 border-t-transparent rounded-full animate-spin"></div>
                        <span className="text-sm text-gray-600">Processing...</span>
                      </div>
                    </div>
                  )}
                  
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleTeddyPhotoUpload}
                    disabled={processingTeddy}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1 flex items-center">
                  <Sparkles className="w-3 h-3 mr-1" />
                  Background automatically removed
                </p>
              </div>
            </div>

            {/* Quick Settings */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="pronouns" className="block text-sm font-medium text-gray-700 mb-2">
                  Pronouns
                </label>
                <select
                  id="pronouns"
                  value={formData.pronouns}
                  onChange={(e) => setFormData(prev => ({ ...prev, pronouns: e.target.value }))}
                  className="w-full h-12 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="they/them">they/them</option>
                  <option value="she/her">she/her</option>
                  <option value="he/him">he/him</option>
                </select>
              </div>

              <div>
                <label htmlFor="color" className="block text-sm font-medium text-gray-700 mb-2">
                  Favorite Color
                </label>
                <select
                  id="color"
                  value={formData.favoriteColor}
                  onChange={(e) => setFormData(prev => ({ ...prev, favoriteColor: e.target.value }))}
                  className="w-full h-12 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="red">❤️ Red</option>
                  <option value="blue">💙 Blue</option>
                  <option value="green">💚 Green</option>
                  <option value="purple">💜 Purple</option>
                  <option value="pink">🩷 Pink</option>
                  <option value="yellow">💛 Yellow</option>
                  <option value="orange">🧡 Orange</option>
                  <option value="rainbow">🌈 Rainbow</option>
                </select>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1 h-12"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading || processingChild || processingTeddy}
                className="flex-1 h-12 bg-orange-600 hover:bg-orange-700 text-white"
              >
                {loading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Creating...</span>
                  </div>
                ) : (
                  `${selectedChild ? 'Update' : 'Create'} Profile`
                )}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddChildModal;
