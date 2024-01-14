import { Mail, Phone } from "lucide-react"

const Privacy = () => {
    return (
        <div className="container mx-auto  p-8 bg-white rounded shadow-lg">
            <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
            <p className="mb-6">Welcome to Blood Hero, a platform dedicated to promoting blood donation and saving lives. This Privacy Policy is designed to inform you about how we collect, use, and safeguard your personal information. We value your trust and are committed to protecting your privacy.</p>
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            <p>By accessing or using Blood Hero (referred to as "we," "us," or the "Platform"), you agree to the terms outlined in this Privacy Policy. If you do not agree with these terms, please refrain from using our services.</p>
            <h2 className="text-2xl font-bold my-4">Information We Collect</h2>
            <div className="ml-4">
                <p className="mb-2">1. Personal Information</p>
                <ul className="list-disc ml-8">
                    <li>Name</li>
                    <li>Contact information (email address, phone number)</li>
                    <li>Location data</li>
                    <li>Blood type (if provided)</li>
                    <li>Other relevant details for blood donation</li>
                </ul>

                <p className="mt-4 mb-2">2. Non-Personal Information</p>
                <ul className="list-disc ml-8">
                    <li>Browser type</li>
                    <li>Device information</li>
                    <li>Log data (IP address, access times, etc.)</li>
                    <li>Cookies and similar technologies</li>
                </ul>
            </div>

            <h2 className="text-2xl font-bold mb-4 mt-6">How We Use Your Information</h2>
            <p>We use the collected information for the following purposes:</p>
            <ol className="list-decimal ml-8 mt-4">
                <li>Blood Donation Services: Facilitate blood donation appointments, locate donation centers, and provide relevant information.</li>
                <li>Communication: Send important updates, appointment confirmations, and other relevant notifications.</li>
                <li>Improvement of Services: Analyze user behavior to enhance our platform, services, and user experience.</li>
                <li>Legal Compliance: Comply with legal obligations and respond to legal requests.</li>
            </ol>

            <h2 className="text-2xl font-bold mb-4 mt-6">Data Sharing and Security</h2>
            <h2 className="text-lg font-bold mb-4 mt-6">Third-Party Services</h2>
            <p className="ml-8">We may share your information with third-party service providers to facilitate our services, such as appointment scheduling and communication. These providers are bound by confidentiality agreements and are prohibited from using your information for any other purpose.</p>
            <h2 className="text-lg font-bold mb-4 mt-6">2. Legal Requirements</h2>
            <p className="ml-8">We may disclose your information if required by law or in response to valid requests from governmental authorities.</p>
            <h2 className="text-lg font-bold mb-4 mt-6">3. Security</h2>
            <p className="ml-8">We employ industry-standard security measures to protect your personal information. However, no method of transmission over the internet or electronic storage is completely secure, and we cannot guarantee absolute security.</p>

            <h2 className="text-2xl font-bold mb-4 mt-6">Your Choices</h2>
            <p>You have the right to:</p>
            <ul className="list-disc ml-8">
                <li>Access and update your personal information.</li>
                <li>Opt-out of non-essential communications.</li>
                <li>Delete your account.</li>
            </ul>

            <h2 className="text-2xl font-bold mb-4 mt-6">Changes to this Privacy Policy</h2>
            <p>We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We encourage you to review this page periodically for the latest information on our privacy practices.</p>


            <h2 className="text-2xl font-bold mb-4 mt-6">Contact Us</h2>
            <p>If you have any questions or concerns about this Privacy Policy or our practices, please contact us at the following:</p>
            <ul className="my-4">
                <li><b>Email:</b> <a href="mailto:kazisharifulislam52@gmail.com"><Mail className="inline-flex h-4" />mail us</a></li>
                <li><b>Phone:</b> <a href="tel:01612178331"> <Phone className="inline-flex h-4" />Call Us</a></li>
                <li><b>Address:</b> Gopalnagar, Brahmanpara, Cumilla</li>
            </ul>
            <p>Thank you for being a part of the Blood Hero community and for your commitment to saving lives through blood donation!</p>

        </div>
    )
}

export default Privacy

