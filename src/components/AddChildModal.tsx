
import React, { useState } from 'react';
import { X, Upload, Camera, Heart, Sparkles, ImageIcon } from 'lucide-react';
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
    photo: selectedChild?.photo || ''
  });

  const [loading, setLoading] = useState(false);
  const [processingPhoto, setProcessingPhoto] = useState(false);

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
        toast({ 
          title: 'Processing your photo...', 
          description: 'Creating personalized book covers. This may take a moment.' 
        });

        // Process the image for personalized covers
        const personalizedCovers: { [key: string]: string } = {};
        const personalizedPages: { [key: string]: string[] } = {};

        // Since we have the processed photo with background removed, we can use it directly
        personalizedCovers['1'] = formData.photo; // Frozen
        personalizedCovers['2'] = formData.photo; // Cinderella
        personalizedCovers['3'] = formData.photo; // Career book

        // For demo pages, we'll use the same processed photo
        for (const book of books) {
          personalizedPages[book.id] = [formData.photo, formData.photo, formData.photo];
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

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        setProcessingPhoto(true);
        toast({
          title: 'Processing photo...',
          description: 'Removing background and preparing your child\'s photo for the stories.',
        });

        // Load the image
        const imageElement = await loadImage(file);
        
        // Remove background
        const processedBlob = await removeBackground(imageElement);
        
        // Convert blob to data URL
        const reader = new FileReader();
        reader.onload = (event) => {
          setFormData(prev => ({ ...prev, photo: event.target?.result as string }));
          toast({
            title: 'Photo processed!',
            description: 'Your child is ready to star in their personalized books.',
          });
        };
        reader.readAsDataURL(processedBlob);
        
      } catch (error) {
        console.error('Error processing photo:', error);
        toast({
          title: 'Processing failed',
          description: 'Could not process the photo. Please try a different image.',
          variant: 'destructive'
        });
      } finally {
        setProcessingPhoto(false);
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-2xl p-0 bg-gradient-to-br from-white to-memo-cream/50 border-0 shadow-2xl">
        <div className="relative p-8">
          {/* Decorative Background Elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-memo-peach/20 rounded-full blur-3xl -z-10"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-memo-blue/20 rounded-full blur-2xl -z-10"></div>
          
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full mb-4 shadow-lg">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 font-nunito mb-2">
              Create Your Little Hero
            </h2>
            <p className="text-gray-600 font-poppins">
              Let's make every story uniquely theirs
            </p>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="absolute top-4 right-4 h-10 w-10 p-0 rounded-full hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Photo Upload Section */}
            <div className="text-center">
              <div className="relative inline-block mb-4">
                <div className="relative group">
                  {formData.photo ? (
                    <div className="relative">
                      <img
                        src={formData.photo}
                        alt="Child photo"
                        className="w-32 h-32 rounded-2xl object-cover border-4 border-white shadow-xl"
                      />
                      <div className="absolute inset-0 bg-black/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <Upload className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  ) : (
                    <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-memo-cream to-memo-peach/50 border-4 border-white shadow-xl flex items-center justify-center group-hover:shadow-2xl transition-shadow duration-300">
                      <div className="text-center">
                        <ImageIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <span className="text-xs text-gray-500 font-medium">Add Photo</span>
                      </div>
                    </div>
                  )}
                  {processingPhoto && (
                    <div className="absolute inset-0 bg-black/50 rounded-2xl flex items-center justify-center">
                      <div className="flex items-center space-x-2 text-white">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span className="text-sm font-medium">Processing...</span>
                      </div>
                    </div>
                  )}
                </div>
                <label htmlFor="photo-upload" className="absolute -bottom-2 -right-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-full p-3 cursor-pointer hover:shadow-lg transform hover:scale-110 transition-all duration-200 disabled:opacity-50">
                  {processingPhoto ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <Upload className="w-4 h-4" />
                  )}
                </label>
                <input
                  id="photo-upload"
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  disabled={processingPhoto}
                  className="hidden"
                />
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600 font-medium mb-1">
                  Upload a photo of your child with their teddy bear
                </p>
                <div className="flex items-center justify-center space-x-1 text-xs text-gray-500">
                  <Sparkles className="w-3 h-3" />
                  <span>Background will be automatically removed</span>
                  <Sparkles className="w-3 h-3" />
                </div>
              </div>
            </div>

            {/* Form Fields */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Name */}
              <div className="md:col-span-2">
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                  Child's Name *
                </label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter your child's name"
                  className="w-full h-12 text-lg border-2 border-gray-200 rounded-xl focus:border-orange-400 focus:ring-orange-400/20 bg-white/80 backdrop-blur-sm"
                  required
                />
              </div>

              {/* Pronouns */}
              <div>
                <label htmlFor="pronouns" className="block text-sm font-semibold text-gray-700 mb-2">
                  Pronouns
                </label>
                <select
                  id="pronouns"
                  value={formData.pronouns}
                  onChange={(e) => setFormData(prev => ({ ...prev, pronouns: e.target.value }))}
                  className="w-full h-12 px-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-400 bg-white/80 backdrop-blur-sm text-gray-700"
                >
                  <option value="they/them">they/them</option>
                  <option value="she/her">she/her</option>
                  <option value="he/him">he/him</option>
                </select>
              </div>

              {/* Favorite Color */}
              <div>
                <label htmlFor="color" className="block text-sm font-semibold text-gray-700 mb-2">
                  Favorite Color
                </label>
                <select
                  id="color"
                  value={formData.favoriteColor}
                  onChange={(e) => setFormData(prev => ({ ...prev, favoriteColor: e.target.value }))}
                  className="w-full h-12 px-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-400 bg-white/80 backdrop-blur-sm text-gray-700"
                >
                  <option value="red">Red ❤️</option>
                  <option value="blue">Blue 💙</option>
                  <option value="green">Green 💚</option>
                  <option value="purple">Purple 💜</option>
                  <option value="pink">Pink 🩷</option>
                  <option value="yellow">Yellow 💛</option>
                  <option value="orange">Orange 🧡</option>
                  <option value="rainbow">Rainbow 🌈</option>
                </select>
              </div>
            </div>

            {/* Benefits Card */}
            <div className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl border-2 border-memo-peach/30 shadow-lg">
              <h3 className="font-bold text-gray-800 mb-3 font-nunito text-lg flex items-center">
                <span className="mr-2">✨</span>
                What happens next?
              </h3>
              <div className="grid md:grid-cols-2 gap-3">
                <div className="flex items-center space-x-2">
                  <span className="text-orange-500">🌟</span>
                  <span className="text-sm text-gray-600">Becomes the story hero</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-pink-500">📖</span>
                  <span className="text-sm text-gray-600">Personalized previews</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-blue-500">🎨</span>
                  <span className="text-sm text-gray-600">Custom artwork</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-purple-500">💝</span>
                  <span className="text-sm text-gray-600">Lasting memories</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1 h-12 border-2 border-gray-300 hover:border-gray-400 rounded-xl font-semibold"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="flex-1 h-12 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200"
              >
                {loading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Processing...</span>
                  </div>
                ) : (
                  <>
                    {selectedChild ? 'Update' : 'Create'} Profile
                  </>
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
