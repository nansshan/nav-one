import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import AuthContext from "@/context/AuthContext"
import { Toaster } from 'sonner'

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'zh' }];
}

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  let messages;
  try {
    messages = (await import(`@/messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider locale={locale} messages={messages}>
            <AuthContext>
              <div className="relative min-h-screen flex flex-col">
                <Header />
                <main className="flex-grow pt-[72px]">
                  {children}
                  <Toaster
                    position="top-center"
                    expand={true}
                    richColors
                    closeButton
                    duration={3000}
                    style={{ 
                      marginTop: '4rem' // 添加上边距，避免被header遮挡
                    }}
                  />
                </main>
                <Footer />
              </div>
            </AuthContext>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
} 