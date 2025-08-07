
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
          title: 'Processing your photos...', 
          description: 'Creating personalized book covers. This may take a moment.' 
        });

        // Process the images for personalized covers
        const personalizedCovers: { [key: string]: string } = {};
        const personalizedPages: { [key: string]: string[] } = {};

        // Use child photo for all book covers if available
        if (formData.childPhoto) {
          personalizedCovers['1'] = formData.childPhoto; // Frozen
          personalizedCovers['2'] = formData.childPhoto; // Cinderella
          personalizedCovers['3'] = formData.childPhoto; // Career book
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

  const handleChildPhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        setProcessingChild(true);
        toast({
          title: 'Processing child photo...',
          description: 'Removing background and preparing photo for the stories.',
        });

        const imageElement = await loadImage(file);
        const processedBlob = await removeBackground(imageElement);
        
        const reader = new FileReader();
        reader.onload = (event) => {
          setFormData(prev => ({ ...prev, childPhoto: event.target?.result as string }));
          toast({
            title: 'Child photo processed!',
            description: 'Ready to star in their personalized books.',
          });
        };
        reader.readAsDataURL(processedBlob);
        
      } catch (error) {
        console.error('Error processing child photo:', error);
        toast({
          title: 'Processing failed',
          description: 'Could not process the photo. Please try a different image.',
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
          title: 'Processing teddy bear photo...',
          description: 'Removing background and preparing teddy for the stories.',
        });

        const imageElement = await loadImage(file);
        const processedBlob = await removeBackground(imageElement);
        
        const reader = new FileReader();
        reader.onload = (event) => {
          setFormData(prev => ({ ...prev, teddyPhoto: event.target?.result as string }));
          toast({
            title: 'Teddy bear photo processed!',
            description: 'Ready to join the adventure.',
          });
        };
        reader.readAsDataURL(processedBlob);
        
      } catch (error) {
        console.error('Error processing teddy photo:', error);
        toast({
          title: 'Processing failed',
          description: 'Could not process the teddy photo. Please try a different image.',
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
        className="max-w-4xl p-0 bg-gradient-to-br from-white via-memo-cream/30 to-memo-blue/10 border-0 shadow-2xl max-h-[90vh] overflow-y-auto"
        aria-describedby="add-child-description"
      >
        <div className="relative p-8">
          {/* Animated Background Elements */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-memo-peach/30 to-orange-400/20 rounded-full blur-3xl animate-pulse -z-10"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-br from-memo-blue/30 to-blue-400/20 rounded-full blur-2xl animate-pulse -z-10" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 left-1/4 w-20 h-20 bg-gradient-to-br from-pink-300/20 to-purple-300/20 rounded-full blur-xl animate-bounce -z-10" style={{animationDelay: '2s'}}></div>
          
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600 rounded-full mb-6 shadow-xl animate-bounce">
              <Heart className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-800 via-purple-600 to-pink-600 bg-clip-text text-transparent font-nunito mb-3">
              Create Your Little Hero
            </h2>
            <p id="add-child-description" className="text-lg text-gray-600 font-poppins max-w-md mx-auto">
              Let's bring your child and their favorite teddy bear into magical adventures
            </p>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="absolute top-6 right-6 h-12 w-12 p-0 rounded-full hover:bg-gray-100/80 backdrop-blur-sm"
            >
              <X className="w-6 h-6" />
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-10">
            {/* Photo Upload Section */}
            <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-white/40 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center font-nunito">
                📸 Add Photos
              </h3>
              
              <div className="grid md:grid-cols-2 gap-8">
                {/* Child Photo */}
                <div className="text-center">
                  <div className="relative inline-block mb-4">
                    <div className="relative group">
                      {formData.childPhoto ? (
                        <div className="relative overflow-hidden rounded-3xl">
                          <img
                            src={formData.childPhoto}
                            alt="Child photo"
                            className="w-40 h-40 object-cover border-4 border-gradient-to-r from-orange-400 to-pink-500 shadow-2xl"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                            <span className="text-white font-semibold text-sm">Change Photo</span>
                          </div>
                        </div>
                      ) : (
                        <div className="w-40 h-40 rounded-3xl bg-gradient-to-br from-memo-cream via-orange-100 to-pink-100 border-4 border-dashed border-orange-300 flex items-center justify-center group-hover:shadow-2xl group-hover:border-orange-400 transition-all duration-300">
                          <div className="text-center">
                            <Camera className="w-12 h-12 text-orange-400 mx-auto mb-3" />
                            <span className="text-sm text-gray-600 font-semibold">Your Child</span>
                          </div>
                        </div>
                      )}
                      {processingChild && (
                        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/80 to-pink-500/80 rounded-3xl flex items-center justify-center">
                          <div className="flex flex-col items-center space-y-2 text-white">
                            <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                            <span className="text-sm font-semibold">Processing...</span>
                          </div>
                        </div>
                      )}
                    </div>
                    <label htmlFor="child-photo" className="absolute -bottom-3 -right-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-full p-4 cursor-pointer hover:shadow-xl transform hover:scale-110 transition-all duration-200 disabled:opacity-50">
                      {processingChild ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      ) : (
                        <Upload className="w-5 h-5" />
                      )}
                    </label>
                    <input
                      id="child-photo"
                      type="file"
                      accept="image/*"
                      onChange={handleChildPhotoUpload}
                      disabled={processingChild}
                      className="hidden"
                    />
                  </div>
                  <div className="text-center">
                    <h4 className="text-lg font-bold text-gray-800 mb-2">👶 Child Photo</h4>
                    <p className="text-sm text-gray-600 mb-1">Upload your little hero</p>
                    <div className="flex items-center justify-center space-x-1 text-xs text-gray-500">
                      <Sparkles className="w-3 h-3" />
                      <span>Auto background removal</span>
                    </div>
                  </div>
                </div>

                {/* Teddy Bear Photo */}
                <div className="text-center">
                  <div className="relative inline-block mb-4">
                    <div className="relative group">
                      {formData.teddyPhoto ? (
                        <div className="relative overflow-hidden rounded-3xl">
                          <img
                            src={formData.teddyPhoto}
                            alt="Teddy bear photo"
                            className="w-40 h-40 object-cover border-4 border-gradient-to-r from-blue-400 to-purple-500 shadow-2xl"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                            <span className="text-white font-semibold text-sm">Change Photo</span>
                          </div>
                        </div>
                      ) : (
                        <div className="w-40 h-40 rounded-3xl bg-gradient-to-br from-memo-blue/20 via-blue-100 to-purple-100 border-4 border-dashed border-blue-300 flex items-center justify-center group-hover:shadow-2xl group-hover:border-blue-400 transition-all duration-300">
                          <div className="text-center">
                            <Heart className="w-12 h-12 text-blue-400 mx-auto mb-3" />
                            <span className="text-sm text-gray-600 font-semibold">Teddy Bear</span>
                          </div>
                        </div>
                      )}
                      {processingTeddy && (
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/80 to-purple-500/80 rounded-3xl flex items-center justify-center">
                          <div className="flex flex-col items-center space-y-2 text-white">
                            <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                            <span className="text-sm font-semibold">Processing...</span>
                          </div>
                        </div>
                      )}
                    </div>
                    <label htmlFor="teddy-photo" className="absolute -bottom-3 -right-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full p-4 cursor-pointer hover:shadow-xl transform hover:scale-110 transition-all duration-200 disabled:opacity-50">
                      {processingTeddy ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      ) : (
                        <Upload className="w-5 h-5" />
                      )}
                    </label>
                    <input
                      id="teddy-photo"
                      type="file"
                      accept="image/*"
                      onChange={handleTeddyPhotoUpload}
                      disabled={processingTeddy}
                      className="hidden"
                    />
                  </div>
                  <div className="text-center">
                    <h4 className="text-lg font-bold text-gray-800 mb-2">🧸 Teddy Bear</h4>
                    <p className="text-sm text-gray-600 mb-1">Their faithful companion</p>
                    <div className="flex items-center justify-center space-x-1 text-xs text-gray-500">
                      <Sparkles className="w-3 h-3" />
                      <span>Auto background removal</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Fields */}
            <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-white/40 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center font-nunito">
                ✨ Character Details
              </h3>
              
              <div className="grid md:grid-cols-3 gap-6">
                {/* Name */}
                <div className="md:col-span-3">
                  <label htmlFor="name" className="block text-lg font-bold text-gray-700 mb-3">
                    Child's Name *
                  </label>
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter your child's name"
                    className="w-full h-14 text-lg border-3 border-gray-200 rounded-2xl focus:border-orange-400 focus:ring-orange-400/20 bg-white/90 backdrop-blur-sm font-semibold"
                    required
                  />
                </div>

                {/* Pronouns */}
                <div>
                  <label htmlFor="pronouns" className="block text-lg font-bold text-gray-700 mb-3">
                    Pronouns
                  </label>
                  <select
                    id="pronouns"
                    value={formData.pronouns}
                    onChange={(e) => setFormData(prev => ({ ...prev, pronouns: e.target.value }))}
                    className="w-full h-14 px-4 border-3 border-gray-200 rounded-2xl focus:outline-none focus:border-orange-400 bg-white/90 backdrop-blur-sm text-gray-700 font-semibold"
                  >
                    <option value="they/them">they/them</option>
                    <option value="she/her">she/her</option>
                    <option value="he/him">he/him</option>
                  </select>
                </div>

                {/* Favorite Color */}
                <div className="md:col-span-2">
                  <label htmlFor="color" className="block text-lg font-bold text-gray-700 mb-3">
                    Favorite Color
                  </label>
                  <select
                    id="color"
                    value={formData.favoriteColor}
                    onChange={(e) => setFormData(prev => ({ ...prev, favoriteColor: e.target.value }))}
                    className="w-full h-14 px-4 border-3 border-gray-200 rounded-2xl focus:outline-none focus:border-orange-400 bg-white/90 backdrop-blur-sm text-gray-700 font-semibold"
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
            </div>

            {/* Benefits Card */}
            <div className="bg-gradient-to-r from-white/80 via-memo-cream/60 to-white/80 backdrop-blur-sm p-8 rounded-3xl border-2 border-memo-peach/30 shadow-xl">
              <h3 className="font-bold text-gray-800 mb-6 font-nunito text-2xl text-center flex items-center justify-center">
                <span className="mr-3">🎉</span>
                What happens next?
                <span className="ml-3">🎉</span>
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-center space-x-4 p-4 bg-white/60 rounded-2xl">
                  <span className="text-3xl">🌟</span>
                  <span className="text-gray-700 font-semibold">Becomes the story hero</span>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-white/60 rounded-2xl">
                  <span className="text-3xl">📖</span>
                  <span className="text-gray-700 font-semibold">Personalized previews</span>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-white/60 rounded-2xl">
                  <span className="text-3xl">🎨</span>
                  <span className="text-gray-700 font-semibold">Custom artwork</span>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-white/60 rounded-2xl">
                  <span className="text-3xl">💝</span>
                  <span className="text-gray-700 font-semibold">Lasting memories</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-6 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1 h-16 border-3 border-gray-300 hover:border-gray-400 rounded-2xl font-bold text-lg"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading || processingChild || processingTeddy}
                className="flex-1 h-16 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 hover:from-orange-600 hover:via-pink-600 hover:to-purple-700 text-white font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-200"
              >
                {loading ? (
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Creating Magic...</span>
                  </div>
                ) : (
                  <>
                    {selectedChild ? '✨ Update' : '🎉 Create'} Profile
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
