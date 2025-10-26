"use client";

import React from "react";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip.tsx";
import usamaImg from "@/assets/people/usamaPic.webp";
import faizanImg from "@/assets/people/faizan.webp";
import abdulImg from "@/assets/people/abdul.webp";
import haseebImg from "@/assets/people/haseeb.webp";

const people = [
    {
        id: 1,
        name: "Muhammad Faizan",
        designation: "Software Engineer",
        image: faizanImg,
    },
    {
        id: 2,
        name: "Muhammad Osama",
        designation: "Certified Kubernetes Application Developer | Staff Software Engineer",
        image: usamaImg,
    },
    {
        id: 3,
        name: "Muhammad Haseeb",
        designation: "Unemployed",
        image: haseebImg,
    },
    {
        id: 4,
        name: "Abdul Musavir",
        designation: "Video Editor",
        image: abdulImg,
    }
];

export default function Tooltip() {
    return (
        <div className="flex flex-row items-center justify-center mb-10 w-full">
            <AnimatedTooltip items={people} />
        </div>
    );
}