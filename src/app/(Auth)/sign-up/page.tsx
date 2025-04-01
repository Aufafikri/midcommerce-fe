"use client"

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import RECAPTCHA from 'react-google-recaptcha'

const SignUpPage = () => {
  const [open, setOpen] = useState(true);
  const [recaptchaVerified, setRecaptchaVerified] = useState(false)
  const [selectedType, setSelectedType] = useState<"user" | "merchant" | null>(null);
  const router = useRouter();

  const handleSelect = (type: "user" | "merchant") => {
    setSelectedType(type)
    setRecaptchaVerified(true)
  };

  const handleCaptchaChange = (value: string | null) => {
    if (value && selectedType) {
      const uniqueId = uuidv4();
      setRecaptchaVerified(false)
      setOpen(false);
      router.push(`/sign-up/${selectedType}/${uniqueId}`);
    } else {
      alert('recaptcha belum terverifikasi')
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center p-6">
      <Dialog open={open} onOpenChange={() => router.back()}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Pilih Tipe Akun</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <Button onClick={() => handleSelect("user")} variant="outline">
              Sign Up sebagai User
            </Button>
            <Button onClick={() => handleSelect("merchant")} variant="outline">
              Sign Up sebagai Merchant
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={recaptchaVerified} onOpenChange={() => setRecaptchaVerified(false)}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Verifikasi Anda Bukan Robot</DialogTitle>
          </DialogHeader>
          <div className="flex">
            <RECAPTCHA
              sitekey={`${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`} // Ganti dengan site key reCAPTCHA kamu
              onChange={handleCaptchaChange}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default SignUpPage