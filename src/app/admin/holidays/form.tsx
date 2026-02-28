'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Sparkles, Save, X, Image as ImageIcon } from 'lucide-react';
import { generateHolidayDescription } from '@/ai/flows/holiday-description-generator';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';

interface HolidayFormProps {
  initialData?: any;
  onSubmit: (data: any) => void;
  loading: boolean;
}

export default function HolidayForm({ initialData, onSubmit, loading }: HolidayFormProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState(initialData || {
    name: '',
    description: '',
    location: '',
    mainImageUrl: '',
    pricePerPerson: '',
    durationNights: '',
    ratingStars: 5,
    boardType: 'All-Inclusive',
    isFeatured: false,
    isLastMinuteOffer: false,
    availableFromDate: new Date().toISOString().split('T')[0],
    availableToDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  });

  const [aiLoading, setAiLoading] = useState(false);

  const handleAiGenerate = async () => {
    if (!formData.name || !formData.location) {
      toast({ variant: "destructive", title: "Incomplete Details", description: "Please enter Hotel Name and Location first." });
      return;
    }
    setAiLoading(true);
    try {
      const result = await generateHolidayDescription({
        hotelName: formData.name,
        location: formData.location,
      });
      setFormData({ ...formData, description: result.description });
      toast({ title: "AI Generation Success", description: "Description updated." });
    } catch (e) {
      toast({ variant: "destructive", title: "AI Failed", description: "Could not generate description." });
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-headline font-bold text-primary">
          {initialData ? 'Edit Holiday Package' : 'Create New Package'}
        </h3>
        <Link href="/admin/holidays">
          <Button variant="ghost" className="text-muted-foreground hover:text-primary">
            <X className="w-4 h-4 mr-2" /> Cancel
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card className="border-none shadow-sm rounded-3xl">
            <CardHeader>
              <CardTitle className="text-lg font-bold">Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Hotel / Package Name</Label>
                  <Input 
                    value={formData.name} 
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="e.g. Ozen Reserve Bolifushi"
                    className="rounded-xl h-11"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Location</Label>
                  <Input 
                    value={formData.location} 
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    placeholder="e.g. South Male Atoll, Maldives"
                    className="rounded-xl h-11"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label>Description</Label>
                  <Button 
                    type="button"
                    variant="ghost" 
                    size="sm" 
                    className="text-accent hover:text-accent/90 font-bold"
                    onClick={handleAiGenerate}
                    disabled={aiLoading}
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    {aiLoading ? "Generating..." : "AI Generate"}
                  </Button>
                </div>
                <Textarea 
                  value={formData.description} 
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="min-h-[200px] rounded-2xl p-4"
                  placeholder="Tell us about this amazing destination..."
                />
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm rounded-3xl">
            <CardHeader>
              <CardTitle className="text-lg font-bold">Pricing & Logistics</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label>Price per Person (£)</Label>
                <Input 
                  type="number"
                  value={formData.pricePerPerson} 
                  onChange={(e) => setFormData({...formData, pricePerPerson: Number(e.target.value)})}
                  className="rounded-xl h-11"
                />
              </div>
              <div className="space-y-2">
                <Label>Nights</Label>
                <Input 
                  type="number"
                  value={formData.durationNights} 
                  onChange={(e) => setFormData({...formData, durationNights: Number(e.target.value)})}
                  className="rounded-xl h-11"
                />
              </div>
              <div className="space-y-2">
                <Label>Rating Stars</Label>
                <Input 
                  type="number"
                  min="1"
                  max="5"
                  value={formData.ratingStars} 
                  onChange={(e) => setFormData({...formData, ratingStars: Number(e.target.value)})}
                  className="rounded-xl h-11"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <aside className="space-y-8">
          <Card className="border-none shadow-sm rounded-3xl overflow-hidden">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-bold">Media</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="aspect-video bg-muted rounded-2xl flex items-center justify-center overflow-hidden border-2 border-dashed border-border">
                {formData.mainImageUrl ? (
                  <img src={formData.mainImageUrl} alt="" className="w-full h-full object-cover" />
                ) : (
                  <ImageIcon className="w-8 h-8 text-muted-foreground" />
                )}
              </div>
              <Input 
                placeholder="Image URL" 
                value={formData.mainImageUrl}
                onChange={(e) => setFormData({...formData, mainImageUrl: e.target.value})}
                className="rounded-xl h-11"
              />
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm rounded-3xl">
            <CardHeader>
              <CardTitle className="text-lg font-bold">Publishing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-3">
                <Checkbox 
                  id="featured" 
                  checked={formData.isFeatured} 
                  onCheckedChange={(val) => setFormData({...formData, isFeatured: !!val})}
                />
                <Label htmlFor="featured" className="font-medium">Featured Holiday</Label>
              </div>
              <div className="flex items-center space-x-3">
                <Checkbox 
                  id="lastminute" 
                  checked={formData.isLastMinuteOffer} 
                  onCheckedChange={(val) => setFormData({...formData, isLastMinuteOffer: !!val})}
                />
                <Label htmlFor="lastminute" className="font-medium">Last Minute Offer</Label>
              </div>

              <div className="pt-6 border-t border-border">
                <Button 
                  onClick={() => onSubmit(formData)} 
                  disabled={loading}
                  className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-12 rounded-xl shadow-lg"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {loading ? "Saving..." : initialData ? "Update Holiday" : "Publish Holiday"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}
