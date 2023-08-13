"use client";
import { useState } from 'react';
import { moodOptions  } from "@/data"
import { Listbox, Popover } from "@headlessui/react"

export default function CurrentMood({ mood, handleMoodChange } : any) {
    
    return (
        <Popover>
            <Popover.Button className="text-sm font-medium w-full flex flex-row justify-between items-center">
                <span className="text-lg w-8 h-8 p-2 flex flex-col items-center justify-center bg-neutral-900 rounded-full">
                    {mood}
                </span>
            </Popover.Button>
            <Popover.Panel>
                <Listbox>
                    <Listbox.Button>
                        {mood}
                    </Listbox.Button>
                </Listbox>
            </Popover.Panel>
        </Popover>
    )
}