'use client';

import { useState, useEffect } from "react";

export default function LegalTerms() {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    // ESC Taste schliesst Modal
    useEffect(() => {
        const escHandler = (e) => {
            if (e.key === "Escape") closeModal();
        };
        window.addEventListener("keydown", escHandler);
        return () => window.removeEventListener("keydown", escHandler);
    }, []);

    return (
        <>
            <button
                onClick={openModal}
                className="px-5 py-2 rounded-full bg-gradient-to-r from-purple-700 to-pink-600 text-white transition-all shadow-lg
                hover:brightness-110 hover:scale-105"
            >
                Legal Terms
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 max-w-2xl w-full text-white shadow-[0_20px_60px_rgba(0,0,0,0.4)] overflow-y-auto max-h-[80vh]">

                        <button
                            onClick={closeModal}
                            className="absolute top-4 right-6 text-white/60 hover:text-white text-2xl font-bold transition"
                        >
                            &times;
                        </button>

                        <h2 className="text-2xl font-semibold mb-4">Legal Terms</h2>

                        <h3 className="text-xl font-semibold mt-4">Terms of Service</h3>
                        <p className="text-white/80">
                            By purchasing our PCB, you agree to use the product solely for development and prototyping purposes.
                            Unauthorized commercial use or resale is prohibited. All purchases are final unless otherwise stated.
                        </p>

                        <h3 className="text-xl font-semibold mt-4">Privacy Policy</h3>
                        <p className="text-white/80">
                            We collect and store personal data (such as your name, address, and email) solely for order processing and support purposes.
                            Your data will not be shared with third parties except as required to fulfill your order or comply with legal obligations.
                        </p>

                        <h3 className="text-xl font-semibold mt-4">Disclaimer</h3>
                        <p className="text-white/80">
                            The PCB is provided "as is" without warranties of any kind. We are not liable for any damages, losses, or injuries resulting
                            from the use or misuse of the product. The user assumes full responsibility for ensuring the product is used safely and appropriately.
                        </p>

                        <p className="mt-4 text-sm text-white/50">
                            If you have any questions about these terms, please contact us at hacklab.infos@gmail.com.
                        </p>
                    </div>
                </div>
            )}
        </>
    );
}
