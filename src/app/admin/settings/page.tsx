'use client';

import { useState, useEffect } from 'react';
import { useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Save, Sparkles, Loader2, CheckCircle2, Phone, Globe, Image as ImageIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { generateHeadline } from '@/ai/flows/ai-enhanced-headline-generation';

export default function AdminSettingsPage() {
  const db = useFirestore();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);

  const settingsRef = useMemoFirebase(() => doc(db, 'companyInfo', 'globalSettings'), [db]);
  const { data: settings, isLoading } = useDoc(settingsRef);

  const [formData, setFormData] = useState({
    contactPhoneNumber: '0800 123 4567',
    operatingHoursText: 'Open 7 days a week',
    heroHeading: 'Your Perfect Holiday Awaits',
    heroSubtitle: 'Discover luxury destinations and unforgettable experiences worldwide.',
    footerCopyrightText: 'Tailor Travels. All rights reserved.',
    logoUrl: '',
    ctaQuoteButtonText: 'Get a Quote',
    ctaCallButtonText: 'Call Us',
    searchWhereToLabel: 'Where to?',
    searchWhenLabel: 'When?',
    searchFlyingFromLabel: 'Flying from',
    searchGuestsLabel: 'Guests',
    searchButtonText: 'SEARCH',
  });

  useEffect(() => {
    if (settings) {
      setFormData(prev => ({ ...prev, ...settings }));
    }
  }, [settings]);

  const handleSave = async () => {
    setLoading(true);
    try {
      await setDoc(settingsRef, {
        ...formData,
        updatedAt: serverTimestamp(),
      }, { merge: true });
      toast({ title: "Settings Saved", description: "Global configuration updated successfully." });
    } catch (e: any) {
      toast({ variant: "destructive", title: "Error", description: e.message });
    } finally {
      setLoading(false);
    }
  };

  const handleAiEnhanceSubtitle = async () => {
    setAiLoading(true);
    try {
      const result = await generateHeadline({
        purpose: "hero section subtitle",
        details: `Luxury travel agency Tailor Travels. Main heading: ${formData.heroHeading}`,
        keywords: ["premium", "unforgettable", "luxury", "expert"]
      });
      setFormData(prev => ({ ...prev, heroSubtitle: result.headline }));
      toast({ title: "AI Generated", description: "Headline enhanced with AI." });
    } catch (e) {
      toast({ variant: "destructive", title: "AI Error", description: "Could not generate headline." });
    } finally {
      setAiLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-headline font-bold text-primary">Site Settings</h1>
          <p className="text-muted-foreground">Manage global content and contact information.</p>
        </div>
        <Button 
          onClick={handleSave} 
          disabled={loading}
          className="bg-accent hover:bg-accent/90 text-white font-bold h-12 px-8 rounded-xl shadow-lg shadow-accent/20"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
          Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Hero Section Settings */}
          <Card className="border-none shadow-sm rounded-3xl overflow-hidden">
            <CardHeader className="bg-primary/5 pb-6">
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-accent" />
                Hero Section
              </CardTitle>
              <CardDescription>The main text users see when they land on the homepage.</CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              <div className="space-y-2">
                <Label>Main Heading</Label>
                <Input 
                  value={formData.heroHeading} 
                  onChange={e => setFormData({ ...formData, heroHeading: e.target.value })}
                  className="rounded-xl h-11"
                />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label>Subtitle</Label>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-accent hover:text-accent/90 font-bold"
                    onClick={handleAiEnhanceSubtitle}
                    disabled={aiLoading}
                  >
                    {aiLoading ? <Loader2 className="w-3 h-3 animate-spin mr-2" /> : <Sparkles className="w-3 h-3 mr-2" />}
                    AI Enhance
                  </Button>
                </div>
                <Textarea 
                  value={formData.heroSubtitle} 
                  onChange={e => setFormData({ ...formData, heroSubtitle: e.target.value })}
                  className="rounded-xl min-h-[100px]"
                />
              </div>
            </CardContent>
          </Card>

          {/* Contact Settings */}
          <Card className="border-none shadow-sm rounded-3xl overflow-hidden">
            <CardHeader className="bg-primary/5 pb-6">
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <Phone className="w-5 h-5 text-accent" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Public Phone Number</Label>
                <Input 
                  value={formData.contactPhoneNumber} 
                  onChange={e => setFormData({ ...formData, contactPhoneNumber: e.target.value })}
                  className="rounded-xl h-11"
                />
              </div>
              <div className="space-y-2">
                <Label>Operating Hours Text</Label>
                <Input 
                  value={formData.operatingHoursText} 
                  onChange={e => setFormData({ ...formData, operatingHoursText: e.target.value })}
                  className="rounded-xl h-11"
                />
              </div>
            </CardContent>
          </Card>

          {/* Search Box Labels */}
          <Card className="border-none shadow-sm rounded-3xl overflow-hidden">
            <CardHeader className="bg-primary/5 pb-6">
              <CardTitle className="text-lg font-bold">Search Interface</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Destinations Label</Label>
                <Input value={formData.searchWhereToLabel} onChange={e => setFormData({...formData, searchWhereToLabel: e.target.value})} className="rounded-xl" />
              </div>
              <div className="space-y-2">
                <Label>Date Label</Label>
                <Input value={formData.searchWhenLabel} onChange={e => setFormData({...formData, searchWhenLabel: e.target.value})} className="rounded-xl" />
              </div>
              <div className="space-y-2">
                <Label>Airports Label</Label>
                <Input value={formData.searchFlyingFromLabel} onChange={e => setFormData({...formData, searchFlyingFromLabel: e.target.value})} className="rounded-xl" />
              </div>
              <div className="space-y-2">
                <Label>Guests Label</Label>
                <Input value={formData.searchGuestsLabel} onChange={e => setFormData({...formData, searchGuestsLabel: e.target.value})} className="rounded-xl" />
              </div>
            </CardContent>
          </Card>
        </div>

        <aside className="space-y-8">
          <Card className="border-none shadow-sm rounded-3xl overflow-hidden">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-bold">Branding</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="aspect-square bg-muted rounded-2xl flex items-center justify-center overflow-hidden border-2 border-dashed border-border p-4">
                {formData.logoUrl ? (
                  <img src={formData.logoUrl} alt="Logo" className="max-w-full max-h-full object-contain" />
                ) : (
                  <div className="text-center">
                    <ImageIcon className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-[10px] text-muted-foreground uppercase font-bold">No Logo Set</p>
                  </div>
                )}
              </div>
              <Input 
                placeholder="Paste Logo URL here" 
                value={formData.logoUrl}
                onChange={e => setFormData({ ...formData, logoUrl: e.target.value })}
                className="rounded-xl h-11"
              />
              <p className="text-[10px] text-muted-foreground italic px-2">Tip: Upload your Tailor Travels logo to a hosting service and paste the direct link above.</p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm rounded-3xl">
            <CardHeader>
              <CardTitle className="text-lg font-bold">Footer</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Copyright Text</Label>
                <Input 
                  value={formData.footerCopyrightText} 
                  onChange={e => setFormData({ ...formData, footerCopyrightText: e.target.value })}
                  className="rounded-xl h-11"
                />
              </div>
              <div className="pt-4 flex items-center gap-2 text-[10px] text-muted-foreground uppercase font-bold tracking-wider">
                <Globe className="w-3 h-3" />
                Live on tailortravels.co.uk
              </div>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}
