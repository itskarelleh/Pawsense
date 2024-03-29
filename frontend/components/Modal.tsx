"use client"
import { Fragment } from "react";
import { Transition, Dialog } from "@headlessui/react";
import { Cancel } from "iconoir-react";

export default function Modal({ title, isOpen, closeModal, children } : any) {

    return (
        <>
        <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-neutral-200/50" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95">
                <Dialog.Panel className="max-w-4/5 transform overflow-hidden box p-6 text-left align-middle transition-all">
                  <div className="flex flex-row justify-between items-center">
                  <Dialog.Title
                    as="h3"
                    className="text-3xl font-medium leading-6 text-gray-900">
                    {title}
                  </Dialog.Title>
                  <button onClick={closeModal} className="text-2xl font-light ">
                    <Cancel />
                  </button>
                  </div>
                    {children}
                  </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition>
          </>
    )
}