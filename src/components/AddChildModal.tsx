
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Upload, User, Sparkles, Wand2, AlertCircle } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { Child } from '@/types';
import { toast } from '@/hooks/use-toast';
import { removeBackground, loadImage } from '@/services/backgroundRemoval';
import { RunwareService } from '@/services/runware';
import { books } from '@/data/books';

interface AddChildModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddChildModal: React.FC<AddChildModalProps> = ({ isOpen, onClose }) => {
  const { selectedChild, setSelectedChild } = useApp();
  const [formData, setFormData] = useState({
    name: selectedChild?.name || '',
    pronouns: selectedChild?.pronouns || '',
    favoriteColor: selectedChild?.favoriteColor || ''
  });
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string>(selectedChild?.photo || '');
  const [apiKey, setApiKey] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhoto(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setPhotoPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const generatePersonalizedCovers = async (child: Child, processedPhotoUrl: string) => {
    if (!apiKey) {
      toast({
        title: "API Key Required",
        description: "Please enter your Runware API key to generate personalized covers",
        variant: "destructive"
      });
      return {};
    }

    setIsGenerating(true);
    const personalizedCovers: { [bookId: string]: string } = {};

    try {
      const runware = new RunwareService(apiKey);
      
      for (const book of books) {
        try {
          const prompt = `Transform the child in the uploaded photo to look like a character from ${book.title.replace('[Child\'s Name]', child.name)}. The child should be integrated naturally into the scene, maintaining the magical storybook art style. Make it look like a professional children's book cover.`;
          
          const result = await runware.editImage(
            [book.cover, processedPhotoUrl],
            prompt,
            0.7
          );
          
          personalizedCovers[book.id] = result.imageURL;
          toast({
            title: "Cover Generated",
            description: `Generated cover for ${book.title.replace('[Child\'s Name]', child.name)}`
          });
        } catch (error) {
          console.error(`Error generating cover for book ${book.id}:`, error);
          toast({
            title: "Generation Error",
            description: `Failed to generate cover for ${book.title.replace('[Child\'s Name]', child.name)}`,
            variant: "destructive"
          });
        }
      }
    } catch (error) {
      console.error('Error in cover generation:', error);
      toast({
        title: "Generation Failed",
        description: "Failed to generate personalized covers",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }

    return personalizedCovers;
  };

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

    let processedPhotoUrl = '';
    let personalizedCovers: { [bookId: string]: string } = selectedChild?.personalizedCovers || {};

    // Process photo if uploaded
    if (photo) {
      try {
        toast({
          title: "Processing Photo",
          description: "Removing background and preparing for AI generation..."
        });
        
        const img = await loadImage(photo);
        const processedBlob = await removeBackground(img);
        
        // Convert blob to data URL for storage
        const reader = new FileReader();
        processedPhotoUrl = await new Promise((resolve) => {
          reader.onload = () => resolve(reader.result as string);
          reader.readAsDataURL(processedBlob);
        });

        toast({
          title: "Photo Processed",
          description: "Photo processed successfully!"
        });

        // Generate personalized covers if API key is provided
        if (apiKey) {
          personalizedCovers = await generatePersonalizedCovers({
            id: Date.now().toString(),
            ...formData,
            photo: photoPreview,
            personalizedCovers: {},
          } as Child, processedPhotoUrl);
        }
      } catch (error) {
        console.error('Error processing photo:', error);
        toast({
          title: "Processing Error",
          description: "Failed to process photo. Continuing without background removal.",
          variant: "destructive"
        });
        processedPhotoUrl = photoPreview;
      }
    }

    const newChild: Child = {
      id: selectedChild?.id || Date.now().toString(),
      name: formData.name.trim(),
      pronouns: formData.pronouns || 'they/them',
      favoriteColor: formData.favoriteColor || 'blue',
      photo: photoPreview,
      processedPhoto: processedPhotoUrl || selectedChild?.processedPhoto,
      personalizedCovers
    };

    setSelectedChild(newChild);
    
    toast({
      title: "Success!",
      description: `${newChild.name} has been ${selectedChild ? 'updated' : 'added'}! All books now feature them as the main character.`,
    });
    
    // Reset form
    setFormData({ name: '', pronouns: '', favoriteColor: '' });
    setPhoto(null);
    setPhotoPreview('');
    setApiKey('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl font-bold text-center">
            <Sparkles className="w-6 h-6 text-yellow-500" />
            {selectedChild ? 'Update' : 'Add Your'} Little Hero
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          {/* API Key Input */}
          <Card className="border-amber-200 bg-amber-50">
            <CardContent className="p-4">
              <div className="flex items-start gap-2 mb-3">
                <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
                <div>
                  <p className="text-sm text-amber-800 font-medium mb-1">
                    AI Personalization (Optional)
                  </p>
                  <p className="text-xs text-amber-700">
                    Enter your Runware API key to generate AI-personalized book covers with your child's photo.
                  </p>
                </div>
              </div>
              <Input
                type="password"
                placeholder="Enter Runware API key (optional)"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="bg-white"
              />
              <p className="text-xs text-amber-600 mt-1">
                Get your API key at <a href="https://runware.ai/" target="_blank" rel="noopener noreferrer" className="underline">runware.ai</a>
              </p>
            </CardContent>
          </Card>

          {/* Photo Upload */}
          <div>
            <Label className="text-sm font-medium text-gray-700 mb-2 block">
              Child's Photo (Optional)
            </Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
              {photoPreview ? (
                <div className="space-y-3">
                  <img 
                    src={photoPreview} 
                    alt="Child preview" 
                    className="w-24 h-24 rounded-full object-cover mx-auto border-4 border-white shadow-lg"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setPhoto(null);
                      setPhotoPreview('');
                    }}
                  >
                    Remove Photo
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                    <User className="w-8 h-8 text-gray-400" />
                  </div>
                  <div>
                    <Button
                      type="button"
                      variant="outline"
                      className="relative"
                      size="sm"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Photo
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                      />
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500">
                    Upload for AI-generated personalized covers
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Name Input */}
          <div>
            <Label htmlFor="name" className="text-sm font-medium text-gray-700">
              Child's Name *
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter your child's name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="mt-1"
              required
            />
          </div>

          {/* Pronouns */}
          <div>
            <Label htmlFor="pronouns" className="text-sm font-medium text-gray-700">
              Pronouns
            </Label>
            <Select value={formData.pronouns} onValueChange={(value) => setFormData(prev => ({ ...prev, pronouns: value }))}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select pronouns" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="they/them">They/Them</SelectItem>
                <SelectItem value="she/her">She/Her</SelectItem>
                <SelectItem value="he/him">He/Him</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Favorite Color */}
          <div>
            <Label htmlFor="favoriteColor" className="text-sm font-medium text-gray-700">
              Favorite Color
            </Label>
            <Select value={formData.favoriteColor} onValueChange={(value) => setFormData(prev => ({ ...prev, favoriteColor: value }))}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select favorite color" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="red">Red</SelectItem>
                <SelectItem value="blue">Blue</SelectItem>
                <SelectItem value="green">Green</SelectItem>
                <SelectItem value="purple">Purple</SelectItem>
                <SelectItem value="pink">Pink</SelectItem>
                <SelectItem value="yellow">Yellow</SelectItem>
                <SelectItem value="orange">Orange</SelectItem>
                <SelectItem value="rainbow">Rainbow</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Submit Button */}
          <Button 
            type="submit"
            className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-semibold py-3 rounded-lg transition-all duration-300"
            disabled={isGenerating}
          >
            {isGenerating ? (
              <>
                <Wand2 className="w-4 h-4 mr-2 animate-spin" />
                Generating Magic...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                {selectedChild ? 'Update' : 'Create'} Their Story
              </>
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddChildModal;
