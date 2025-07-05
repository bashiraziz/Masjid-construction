import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Phone, Mail, DollarSign, Send } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900">Contact & Donation Info</h1>
        <p className="mt-2 text-lg text-gray-600">
          We are grateful for your interest and support. Here’s how you can reach us or send your contribution.
        </p>
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Phone className="h-6 w-6 text-green-700" />
              <span>Phone</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <a href="tel:+1-404-825-8545" className="text-lg text-gray-800 hover:text-green-700">
              +1-404-825-8545
            </a>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Mail className="h-6 w-6 text-green-700" />
              <span>Email</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <a
              href="mailto:bashiraziz+donations@gmail.com"
              className="text-lg text-gray-800 hover:text-green-700 break-all"
            >
              bashiraziz+donations@gmail.com
            </a>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <DollarSign className="h-6 w-6 text-green-700" />
              <span>Zelle</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-gray-800">
              Use phone number: <span className="font-semibold">+1-404-825-8545</span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Send className="h-6 w-6 text-green-700" />
              <span>Mail a Cheque</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="text-lg text-gray-800">
            <p className="font-semibold">Payable to: Bashir Aziz</p>
            <address className="not-italic mt-2">
              1275 W Booth Rd Ext SW
              <br />
              Marietta GA 30008
              <br />
              USA
            </address>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
