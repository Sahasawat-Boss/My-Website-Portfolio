"use client";

import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { useMotionValue, useMotionTemplate, motion, animate, useInView } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";

const COLORS_TOP = ["#1E67C6", "#CE84CF", "#13FFAA", "#DD335C"];

function Hero() {
    const color = useMotionValue(COLORS_TOP[0]);

    useEffect(() => {
        animate(color, COLORS_TOP, {
            ease: "easeInOut",
            duration: 4.5,
            repeat: Infinity,
            repeatType: "mirror"
        });
    }, [color]);

    const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #000 50%, ${color})`;
    const border = useMotionTemplate`1px solid ${color}`;
    const boxShadow = useMotionTemplate`0px 4px 24px ${color}`;

    // 🔹 Detect when this section is in view
    const ref = useRef(null);
    const isInView = useInView(ref, { amount: 0.3 });

    return (
        <motion.section
            ref={ref}
            style={{ backgroundImage }}
            className="relative flex justify-center items-center min-h-[80vh] px-4 py-24 text-gray-200"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            <div className="z-10 flex flex-col gap-y-3 items-center">
                {/* Animated Heading */}
                <motion.div
                    className="flex gap-3"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <h1 className="text-white/40 text-5xl md:text-6xl font-black">
                        Hello, I&apos;m
                    </h1>
                    <h1 className="bg-gradient-to-br from-white to-gray-600 bg-clip-text text-transparent text-5xl md:text-6xl">
                        Boss
                    </h1>
                </motion.div>

                {/* Animated Profile Picture */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <Image
                        className="mt-10 md:w-60 rounded-full hover:scale-110 transition-transform duration-300"
                        src={"/profilepic.jpg"}
                        alt="profile pic"
                        width={150}
                        height={150}
                    />
                </motion.div>

                {/* Animated Subtitle */}
                <motion.span
                    className="mt-2 mb-10 inline-block rounded-full bg-gray-600/50 px-3 py-1.5"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.6 }}
                >
                    Passionate to be a Fullstack Developer
                </motion.span>

                {/* Animated Contact Button */}
                <motion.button
                    className="flex w-fit item-center gap-2 rounded-full px-5 py-2 text-lg"
                    style={{
                        border,
                        boxShadow
                    }}
                    whileHover={{
                        scale: 1.1
                    }}
                    whileTap={{
                        scale: 0.85
                    }}
                > Contact Me
                    <FiArrowRight className="mt-1 text-lg" />
                </motion.button>


            </div>
        </motion.section>
    );
}

export default Hero;
