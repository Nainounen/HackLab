'use client';

import React, { useState, useEffect } from "react";

export default function ImpressumPopUp() {
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
                Legal Notice
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 max-w-xl w-full text-white shadow-[0_20px_60px_rgba(0,0,0,0.4)] overflow-y-auto max-h-[80vh]">

                        <button
                            onClick={closeModal}
                            className="absolute top-4 right-6 text-white/60 hover:text-white text-2xl font-bold transition"
                        >
                            &times;
                        </button>

                        <h2 className="text-2xl font-semibold mb-4">Legal Notice</h2>

                        <p className="mb-2">
                            <strong>Responsible:</strong> HackLab
                        </p>
                        <p className="mb-2">
                            <strong>Address:</strong> Musterstrasse 123, 6000 Lucerne, Switzerland
                        </p>
                        <p className="mb-4">
                            <strong>Contact:</strong> hacklab.infos@gmail.com
                        </p>
                        <p className="text-sm text-white/60">
                            Information according to § 5 TMG. HackLab are responsible for the content of this page.
                        </p>
                    </div>
                </div>
            )}
        </>
    );
}
