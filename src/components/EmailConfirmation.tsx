import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, CheckCircle, AlertCircle, ArrowLeft } from 'lucide-react';
import { useState, useEffect } from 'react';

interface EmailConfirmationProps {
  email: string;
  bookingId: string;
  language: 'sk' | 'en';
  onBack: () => void;
  onVerified: () => void;
}

export default function EmailConfirmation({ email, bookingId, language, onBack, onVerified }: EmailConfirmationProps) {
  const [confirmationCode, setConfirmationCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState('');
  const [resendCooldown, setResendCooldown] = useState(0);

  const translations = {
    sk: {
      title: 'Potvrďte svoju emailovú adresu',
      subtitle: 'Poslali sme vám overovací kód na',
      codeLabel: 'Overovací kód',
      codePlaceholder: 'Zadajte 6-miestny kód',
      verify: 'Overiť',
      verifying: 'Overujem...',
      resend: 'Poslať znovu',
      resendCooldown: 'Poslať znovu za',
      seconds: 'sekúnd',
      backToBooking: 'Späť na rezerváciu',
      invalidCode: 'Neplatný overovací kód',
      codeExpired: 'Overovací kód vypršal',
      instructions: 'Zadajte 6-miestny kód, ktorý ste dostali na svoj email. Ak kód nevidíte, skontrolujte spam priečinok.',
    },
    en: {
      title: 'Confirm Your Email Address',
      subtitle: 'We sent a verification code to',
      codeLabel: 'Verification Code',
      codePlaceholder: 'Enter 6-digit code',
      verify: 'Verify',
      verifying: 'Verifying...',
      resend: 'Resend Code',
      resendCooldown: 'Resend in',
      seconds: 'seconds',
      backToBooking: 'Back to Booking',
      invalidCode: 'Invalid verification code',
      codeExpired: 'Verification code has expired',
      instructions: 'Enter the 6-digit code sent to your email. If you don\'t see the code, check your spam folder.',
    }
  };

  const t = translations[language];

  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const handleVerify = async () => {
    if (confirmationCode.length !== 6) {
      setError(t.invalidCode);
      return;
    }

    setIsVerifying(true);
    setError('');

    try {
      // Simulate API call to verify code
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // For demo purposes, accept any 6-digit code
      if (confirmationCode.length === 6) {
        // Here you would update the booking status in the database
        console.log('Booking confirmed:', bookingId);
        onVerified();
      } else {
        setError(t.invalidCode);
      }
    } catch (err) {
      setError(t.codeExpired);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResend = async () => {
    setResendCooldown(60);
    // Here you would call API to resend verification email
    console.log('Resending verification code to:', email);
  };

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-screen flex justify-center">
        <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm max-w-md w-full">
          <CardHeader className="text-center pb-6">
            <div className="mx-auto w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mb-6 shadow-lg">
              <Mail className="w-10 h-10 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
              {t.title}
            </CardTitle>
            <div className="space-y-2">
              <p className="text-gray-600">
                {t.subtitle}
              </p>
              <p className="font-semibold text-gray-900 bg-gray-50 px-3 py-2 rounded-lg">
                {email}
              </p>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <p className="text-sm text-gray-600 text-center leading-relaxed">
              {t.instructions}
            </p>

            <div className="space-y-2">
              <Label htmlFor="code" className="text-sm font-medium text-gray-700">
                {t.codeLabel}
              </Label>
              <Input
                id="code"
                type="text"
                placeholder={t.codePlaceholder}
                value={confirmationCode}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                  setConfirmationCode(value);
                  setError('');
                }}
                className="text-center text-xl tracking-[0.5em] font-mono h-14 border-2 focus:border-blue-500 transition-colors"
                maxLength={6}
              />
            </div>

            {error && (
              <div className="flex items-center justify-center space-x-2 text-red-600 text-sm bg-red-50 p-3 rounded-lg">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <Button
              onClick={handleVerify}
              disabled={confirmationCode.length !== 6 || isVerifying}
              className="w-full h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isVerifying ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>{t.verifying}</span>
                </div>
              ) : (
                t.verify
              )}
            </Button>

            <div className="text-center">
              <Button
                variant="ghost"
                onClick={handleResend}
                disabled={resendCooldown > 0}
                className="text-sm text-gray-600 hover:text-gray-800 transition-colors"
              >
                {resendCooldown > 0 
                  ? `${t.resendCooldown} ${resendCooldown} ${t.seconds}`
                  : t.resend
                }
              </Button>
            </div>

            <Button
              variant="outline"
              onClick={onBack}
              className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t.backToBooking}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}