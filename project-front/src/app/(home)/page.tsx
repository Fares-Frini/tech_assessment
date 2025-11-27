'use client';

import { SavedImagesGrid } from '@/components/home/SavedImagesGrid';
import { StartOptionsDialog } from '@/components/home/StartOptionsDialog';
import { Button } from '@/components/ui/button';
import {
    Camera,
    ChevronRight,
    Download,
    ImagePlus,
    Sparkles,
    Wand2,
} from 'lucide-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface SavedImage {
  id: string;
  name: string;
  imagePath: string;
  createdAt: string;
}

const FEATURES = [
  {
    icon: Camera,
    title: 'Capture or Upload',
    description: 'Take a photo or upload an existing image of your smile',
  },
  {
    icon: Wand2,
    title: 'Place Jewelry',
    description: 'Drag and drop dental jewels onto your teeth with precision',
  },
  {
    icon: Download,
    title: 'Save & Share',
    description: 'Download your preview or save it to your account',
  },
];

export default function HomePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [showDialog, setShowDialog] = useState(false);
  const [savedImages, setSavedImages] = useState<SavedImage[]>([]);
  const [isLoadingImages, setIsLoadingImages] = useState(false);

  const isAuthenticated = status === 'authenticated';

  const handleStartNow = () => {
    if (isAuthenticated) {
      router.push('/canvas');
    } else {
      router.push('/login?callbackUrl=/canvas');
    }
  };

  useEffect(() => {
    const fetchSavedImages = async () => {
      if (session?.accessToken) {
        setIsLoadingImages(true);
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/saved-images`,
            {
              headers: {
                Authorization: `Bearer ${session.accessToken}`,
              },
            }
          );
          if (response.ok) {
            const data = await response.json();
            setSavedImages(data);
          }
        } catch (error) {
          console.error('Failed to fetch saved images:', error);
        } finally {
          setIsLoadingImages(false);
        }
      }
    };

    fetchSavedImages();
  }, [session]);

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-purple-50 via-white to-white">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-200/30 rounded-full blur-3xl" />
          <div className="absolute top-20 -left-20 w-60 h-60 bg-purple-300/20 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 py-16 sm:py-24 md:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text Content */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-100 text-purple-700 text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4" />
                Preview before you commit
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Visualize Your{' '}
                <span className="bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                  Dental Jewelry
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0">
                Try on stunning dental gems virtually before your appointment.
                Upload a photo or use your camera to see exactly how it will
                look.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button
                  onClick={handleStartNow}
                  size="lg"
                  className="h-14 px-8 text-base font-semibold bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 shadow-lg shadow-purple-500/25 transition-all hover:shadow-xl hover:shadow-purple-500/30 hover:scale-[1.02]"
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  {isAuthenticated ? 'Start Now' : 'Login to Start'}
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  className="h-14 px-8 text-base font-semibold border-2 border-gray-200 hover:border-purple-300 hover:bg-purple-50"
                  asChild
                >
                  <Link href="https://luce.es/collection" target="_blank">
                    View Collection
                  </Link>
                </Button>
              </div>
            </div>

            {/* Right: Hero Image/Preview */}
            <div className="relative">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl shadow-purple-500/20 border border-purple-100">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-100 to-purple-50 flex items-center justify-center">
                  {/* Placeholder for hero image - you can replace with actual image */}
                  <div className="text-center p-8">
                    <div className="w-24 h-24 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center shadow-lg">
                      <Sparkles className="w-12 h-12 text-white" />
                    </div>
                    <p className="text-purple-600 font-medium">
                      Your smile, enhanced
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg p-3 flex items-center gap-3 border border-gray-100">
                <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                  <Camera className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Live Camera
                  </p>
                  <p className="text-xs text-gray-500">Real-time preview</p>
                </div>
              </div>

              <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-lg p-3 flex items-center gap-3 border border-gray-100">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                  <ImagePlus className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Upload Photo
                  </p>
                  <p className="text-xs text-gray-500">Any image format</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Three simple steps to preview your perfect dental jewelry
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {FEATURES.map((feature, index) => (
              <div
                key={feature.title}
                className="relative text-center p-6 rounded-2xl bg-gray-50 hover:bg-purple-50 transition-colors group"
              >
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-purple-600 text-white text-sm font-bold flex items-center justify-center">
                  {index + 1}
                </div>
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-white shadow-md flex items-center justify-center group-hover:shadow-lg transition-shadow">
                  <feature.icon className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Saved Images Section (for authenticated users) */}
      {isAuthenticated && (
        <section className="py-16 sm:py-24 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                  My Saved Designs
                </h2>
                <p className="text-gray-600">
                  Continue working on your previous creations
                </p>
              </div>
              {savedImages.length > 0 && (
                <Link
                  href="/saved-images"
                  className="text-purple-600 hover:text-purple-700 font-medium flex items-center gap-1 group"
                >
                  View all
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              )}
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <SavedImagesGrid
                images={savedImages}
                isLoading={isLoadingImages}
              />
            </div>
          </div>
        </section>
      )}

      {/* CTA Section (for unauthenticated users) */}
      {!isAuthenticated && (
        <section className="py-16 sm:py-24 bg-gradient-to-b from-white to-purple-50">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-purple-100 flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-purple-600" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Save Your Creations
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto">
              Create an account to save your dental jewelry previews and access
              them anytime from any device.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="h-12 px-8 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800"
                asChild
              >
                <Link href="/register">Create Free Account</Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="h-12 px-8 border-2"
                asChild
              >
                <Link href="/login">Sign In</Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Start Options Dialog */}
      <StartOptionsDialog
        open={showDialog}
        onClose={() => setShowDialog(false)}
      />
    </main>
  );
}
