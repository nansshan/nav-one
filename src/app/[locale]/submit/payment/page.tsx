'use client';

import { useTranslations } from 'next-intl';
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, X } from "lucide-react"
import Image from "next/image"
import { useRouter } from 'next/navigation';

export default function PaymentPage() {
  const t = useTranslations('payment');
  const router = useRouter();
  
  return (
    <div className="max-w-4xl mx-auto p-4 space-y-8">
    <div className="space-y-2">
      <h1 className="text-3xl font-bold">Submit</h1>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center">
            <Check className="h-4 w-4" />
          </div>
          <span className="text-muted-foreground">Details</span>
        </div>
        <div className="flex-1 h-px bg-border" />
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">2</div>
          <span className="font-medium">Payment</span>
        </div>
        <div className="flex-1 h-px bg-border" />
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center">3</div>
          <span className="text-muted-foreground">Publish</span>
        </div>
      </div>
    </div>

    <Card>
      <CardContent className="p-6">
        <div className="text-sm text-muted-foreground mb-2">2/3 Choose pricing plan</div>
        <div className="grid md:grid-cols-[1fr,2fr] gap-6 mb-8">
          <div className="relative aspect-[4/3] rounded-lg overflow-hidden border">
            <Image
              src="/placeholder.svg"
              alt="Product preview"
              fill
              className="object-cover"
            />
            <div className="absolute bottom-2 left-2 flex gap-2">
              <Badge variant="secondary">Design</Badge>
              <Badge variant="secondary"># web</Badge>
            </div>
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">signaturegenerator</h2>
            <p className="text-muted-foreground">Welcome to our Signature Generator!</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-muted-foreground">Plan:</div>
                <div>Free</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Status:</div>
                <div>Submitting</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Publish Date:</div>
                <div>Not published</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Created Date:</div>
                <div>2024/11/06</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="relative">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-xl font-bold">FREE</h3>
                <div className="text-3xl font-bold">$0</div>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex gap-2">
                  <Check className="h-5 w-5 text-primary shrink-0" />
                  <span>Get 3 dofollow links to boost your SEO</span>
                </li>
                <li className="flex gap-2">
                  <Check className="h-5 w-5 text-primary shrink-0" />
                  <span>Permanent link with backlink maintenance</span>
                </li>
                <li className="flex gap-2">
                  <Check className="h-5 w-5 text-primary shrink-0" />
                  <span>Reviewed and listed within 72 hours</span>
                </li>
                <li className="flex gap-2">
                  <Check className="h-5 w-5 text-primary shrink-0" />
                  <span>Publish your product the day you want</span>
                </li>
                <li className="flex gap-2 text-muted-foreground">
                  <X className="h-5 w-5 shrink-0" />
                  <span>Backlink to our site is required</span>
                </li>
                <li className="flex gap-2 text-muted-foreground">
                  <X className="h-5 w-5 shrink-0" />
                  <span>No customer support</span>
                </li>
              </ul>
              <Button className="w-full" variant="outline">
                Submit to review
              </Button>
            </CardContent>
          </Card>

          <Card className="relative">
            <CardContent className="p-6">
              <Badge className="absolute -top-3 right-6 bg-primary text-primary-foreground">POPULAR</Badge>
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-xl font-bold">PRO</h3>
                <div className="text-3xl font-bold">$9.9</div>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex gap-2">
                  <Check className="h-5 w-5 text-primary shrink-0" />
                  <span>Get at least 3 dofollow links to boost your SEO</span>
                </li>
                <li className="flex gap-2">
                  <Check className="h-5 w-5 text-primary shrink-0" />
                  <span>Listed immediately, publish it whenever you want</span>
                </li>
                <li className="flex gap-2">
                  <Check className="h-5 w-5 text-primary shrink-0" />
                  <span>Permanent link, no backlink required</span>
                </li>
                <li className="flex gap-2">
                  <Check className="h-5 w-5 text-primary shrink-0" />
                  <span>Featured in listings with an award icon</span>
                </li>
                <li className="flex gap-2">
                  <Check className="h-5 w-5 text-primary shrink-0" />
                  <span>Share through social media and newsletters</span>
                </li>
                <li className="flex gap-2">
                  <Check className="h-5 w-5 text-primary shrink-0" />
                  <span>Premium customer support</span>
                </li>
              </ul>
              <Button className="w-full bg-primary text-primary-foreground">
                Pay & Publish Right Now
              </Button>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  </div>
  );
} 