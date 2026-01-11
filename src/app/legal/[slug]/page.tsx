import { notFound } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

const legalContent: Record<string, { title: string; content: string }> = {
    imprint: {
        title: 'Imprint',
        content: `
      <div class="space-y-6">
        <div>
            <h3 class="text-xl font-bold mb-2">Ray Group</h3>
            <p>Represented by Rezan Yalçin</p>
        </div>
        
        <div>
            <h4 class="font-semibold mb-1">Contact</h4>
            <p>Email: contact@ray-group.eu</p>
            <p>Website: www.ray-group.eu</p>
        </div>

        <div class="p-4 bg-white/5 border border-white/10 rounded-xl">
            <p class="text-sm text-white/50">Details regarding VAT ID, Commercial Register, and specific address are to be added pending legal finalization.</p>
        </div>
      </div>
    `
    },
    privacy: {
        title: 'Privacy Policy',
        content: `
      <div class="space-y-8">
        <div class="p-4 border-l-2 border-ray-blue bg-ray-blue/5">
            <p class="font-bold text-ray-blue mb-1">DRAFT STATUS</p>
            <p class="text-sm">This document is a placeholder/draft. It must be reviewed by legal counsel before the website goes live in production.</p>
        </div>

        <section>
            <h3 class="text-2xl font-display font-medium mb-4 text-white">1. Data Protection at a Glance</h3>
            <p>We respect your privacy. This website generally collects minimal data necessary for technical operation (server logs). We do not use invasive third-party tracking without your explicit consent.</p>
        </section>

        <section>
            <h3 class="text-2xl font-display font-medium mb-4 text-white">2. Hosting</h3>
            <p>This website is hosted by an external service provider (Vercel/Netlify/Similar). Personal data collected on this website is stored on the host's servers. This may include IP addresses, meta/communication data, and website access data.</p>
        </section>

        <section>
            <h3 class="text-2xl font-display font-medium mb-4 text-white">3. Contact Form</h3>
            <p>If you send us inquiries via the contact form, your details from the inquiry form, including the contact details you provided there, will be stored by us for the purpose of processing the inquiry and in case of follow-up questions.</p>
        </section>
      </div>
    `
    },
    terms: {
        title: 'Terms of Service',
        content: `
      <div class="space-y-8">
        <div class="p-4 border-l-2 border-ray-blue bg-ray-blue/5">
            <p class="font-bold text-ray-blue mb-1">DRAFT STATUS</p>
            <p class="text-sm">This document is a placeholder/draft. It must be reviewed by legal counsel before the website goes live in production.</p>
        </div>
        
        <p>By accessing this website, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.</p>
        
        <h3 class="text-xl font-bold mt-6 mb-2">Intellectual Property</h3>
        <p>The content, organization, graphics, design, compilation, and other matters related to the Site are protected under applicable copyrights and other proprietary (including but not limited to intellectual property) rights.</p>
      </div>
    `
    },
    cookies: {
        title: 'Cookie Policy',
        content: `
      <div class="space-y-8">
         <div class="p-4 border-l-2 border-ray-blue bg-ray-blue/5">
            <p class="font-bold text-ray-blue mb-1">DRAFT STATUS</p>
            <p class="text-sm">This document is a placeholder/draft.</p>
        </div>

        <p>This website uses cookies to ensure you get the best experience on our website. We use two types of cookies:</p>
        
        <ul class="list-disc pl-6 space-y-2">
            <li><strong>Essential Cookies:</strong> Necessary for the website to function (e.g. saving your consent preferences).</li>
            <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with the website. These are only active if you give consent.</li>
        </ul>

        <p class="mt-4">You can adjust your cookie settings at any time using the link in the footer.</p>
      </div>
    `
    }
}

export function generateStaticParams() {
    return Object.keys(legalContent).map((slug) => ({ slug }))
}

// Correct type definition for Page Props in Next.js 15
export default async function LegalPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const data = legalContent[slug]

    if (!data) {
        notFound()
    }

    return (
        <>
            <Header />
            <main className="min-h-screen pt-32 pb-20">
                <div className="container mx-auto px-6 max-w-3xl">
                    <Link href="/" className="text-sm text-ray-blue mb-8 block hover:underline">
                        &larr; Back to Home
                    </Link>

                    <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-12">
                        {data.title}
                    </h1>

                    <div
                        className="prose prose-invert prose-lg text-white/70"
                        dangerouslySetInnerHTML={{ __html: data.content }}
                    />
                </div>
            </main>
            <Footer />
        </>
    )
}
