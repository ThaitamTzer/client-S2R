import React from 'react'
import Image from 'next/image'

interface StepProps {
  title: string
  descriptions: { text: string; image?: string }[]
}

export default function HeaderManualSection({ steps }: { steps: StepProps[] }) {
  return (
    <header className="flex flex-col gap-5">
      {steps.map((step, index) => (
        <div key={index}>
          <h3 className="text-lg font-semibold">{step.title}</h3>
          {step.descriptions.map((desc, idx) => (
            <div key={idx} className="mb-4">
              <p className="text-base">
                {desc.text.split(/(Bước \d+:)/).map((part, i) =>
                  /Bước \d+:/.test(part) ? (
                    <span key={i} className="font-semibold">
                      {part}
                    </span>
                  ) : (
                    part
                  ),
                )}
              </p>
              {desc.image && (
                <div className="w-full flex justify-center my-4">
                  <Image
                    src={desc.image}
                    alt="Step illustration"
                    width={1200}
                    height={812}
                    loading="lazy"
                    quality={100}
                    className="w-full max-w-[900px] h-auto"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      ))}
    </header>
  )
}
