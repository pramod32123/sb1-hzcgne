import React, { useState, useEffect, useRef } from 'react'
import { Send, Bot } from 'lucide-react'

interface Message {
  text: string
  isUser: boolean
}

interface AIChatbotProps {
  projectTitle: string
}

const AIChatbot: React.FC<AIChatbotProps> = ({ projectTitle }) => {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<null | HTMLDivElement>(null)

  useEffect(() => {
    const welcomeMessage = generateAIResponse(projectTitle, 'hello')
    setMessages([{ text: welcomeMessage, isUser: false }])
  }, [projectTitle])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSendMessage = async () => {
    if (input.trim() === '') return

    const userMessage: Message = { text: input, isUser: true }
    setMessages(prevMessages => [...prevMessages, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate network delay
      const aiResponse = generateAIResponse(projectTitle, input)
      const aiMessage: Message = { text: aiResponse, isUser: false }
      setMessages(prevMessages => [...prevMessages, aiMessage])
    } catch (error) {
      console.error('Error generating AI response:', error)
      const errorMessage: Message = { text: "I'm sorry, I couldn't process your request. Please try again.", isUser: false }
      setMessages(prevMessages => [...prevMessages, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const generateAIResponse = (projectTitle: string, userInput: string): string => {
    const lowercaseInput = userInput.toLowerCase()

    if (lowercaseInput.includes('can i talk with a real agent') || 
        lowercaseInput.includes('speak to a real agent') || 
        lowercaseInput.includes('contact a representative')) {
      return "Yes, please find the contact info below the timeline."
    }

    switch (projectTitle) {
      case "Urban Reforestation Project":
        if (lowercaseInput.includes('where') && lowercaseInput.includes('tree planting')) {
          return "The tree planting project was completed in Central Park, New York, specifically in the northern area near Harlem Meer."
        } else if (lowercaseInput.includes('how many trees')) {
          return "A total of 100 native trees, including oak and maple species, were planted to enhance biodiversity and combat urban pollution."
        } else if (lowercaseInput.includes('what types of trees')) {
          return "The trees planted include oak, maple, and cherry blossom trees, chosen for their environmental benefits and local suitability."
        } else if (lowercaseInput.includes('who took part')) {
          return "Volunteers from the local community, including students and park rangers, participated in the project."
        } else if (lowercaseInput.includes('how') && lowercaseInput.includes('help') && lowercaseInput.includes('environment')) {
          return "The project helps reduce air pollution, increases urban green spaces, and provides habitats for local wildlife."
        } else if (lowercaseInput.includes('pictures') || lowercaseInput.includes('see the work')) {
          return "Yes! Please click on the dropdown above to see before-and-after pictures of the reforestation work."
        } else if (lowercaseInput.includes('irrigation system') && lowercaseInput.includes('queensbridge')) {
          return "The irrigation systems provide automatic, scheduled watering to the newly planted trees, ensuring they receive enough water without waste."
        } else if (lowercaseInput.includes('how long') && lowercaseInput.includes('grow')) {
          return "It typically takes 10-15 years for these trees to fully mature, but they'll start benefiting the environment within the first year."
        } else if (lowercaseInput.includes('who') && lowercaseInput.includes('maintain')) {
          return "The Central Park Conservancy and local volunteers are responsible for the long-term care and maintenance of these trees."
        } else if (lowercaseInput.includes('volunteer') && lowercaseInput.includes('future')) {
          return "Absolutely! You can contact us to learn more about upcoming volunteer opportunities in your area. Would you like to speak with a real agent for more information?"
        }
        break;
      case "Clean Water Access Initiative":
        if (lowercaseInput.includes('where') && lowercaseInput.includes('well')) {
          return "The well was installed in Chhampi, a village in Lalitpur, Nepal. It serves a community of about 300 people."
        } else if (lowercaseInput.includes('how deep') && lowercaseInput.includes('well')) {
          return "The well is approximately 150 feet deep, ensuring access to clean and safe drinking water year-round."
        } else if (lowercaseInput.includes('how') && lowercaseInput.includes('purification system') && lowercaseInput.includes('installed')) {
          return "The purification system was set up using activated carbon filters and UV lights to eliminate bacteria and pollutants from the water."
        } else if (lowercaseInput.includes('how many people') && lowercaseInput.includes('benefit')) {
          return "Over 300 people in the Chhampi community rely on this well for their daily water needs."
        } else if (lowercaseInput.includes('how') && lowercaseInput.includes('rainwater harvesting')) {
          return "The rainwater harvesting system collects rainwater from rooftops, filters it, and stores it in large tanks. This water is used during dry periods."
        } else if (lowercaseInput.includes('what happens') && lowercaseInput.includes('dry season')) {
          return "During the dry season, the community uses the stored rainwater. In addition, we have backup filtration systems connected to nearby rivers."
        } else if (lowercaseInput.includes('who maintains') && lowercaseInput.includes('water system')) {
          return "The local community has been trained to maintain and operate the water systems, with periodic checkups from our team."
        } else if (lowercaseInput.includes('how') && lowercaseInput.includes('solar-powered') && lowercaseInput.includes('filtration')) {
          return "Solar panels generate the electricity needed to run water filtration units, making this a sustainable solution for remote communities."
        } else if (lowercaseInput.includes('how many students') && lowercaseInput.includes('benefit')) {
          return "Over 500 students at Shree Himaganga Secondary School now have access to clean drinking water thanks to this system."
        }
        break;
    }

    // General questions
    if (lowercaseInput.includes('how can i volunteer')) {
      return "You can volunteer by contacting us through our official channels. Would you like to speak with a real agent to get the details?"
    } else if (lowercaseInput.includes('how can i donate')) {
      return "Thank you for your interest in supporting us! I can connect you to a real agent who will help you with the donation process. Would you like to proceed?"
    } else if (lowercaseInput.includes('what other projects')) {
      return "We are involved in various environmental and humanitarian projects. You can visit our project page, or I can connect you to a representative for more details."
    } else if (lowercaseInput.includes('proof') && lowercaseInput.includes('work done')) {
      return "Yes, each project has documented proof. You can check the image gallery above for detailed photos of the work done."
    } else if (lowercaseInput.includes('how can i trust')) {
      return "We are fully transparent, and our work is open for public verification. You can review our past projects and even file a complaint if you have any concerns: https://www.dfs.ny.gov/complaint."
    } else if (lowercaseInput.includes('file a complaint') || lowercaseInput.includes('doubt this organization')) {
      return "If you have any doubts, you can file a complaint here: https://www.dfs.ny.gov/complaint."
    }

    return "Hi, how can I help you?"
  }

  return (
    <div className="mt-6 border rounded-lg overflow-hidden bg-white shadow-md">
      <div className="bg-green-100 p-3 flex items-center">
        <Bot className="h-6 w-6 text-green-600 mr-2" />
        <h3 className="font-semibold">Project AI Assistant</h3>
      </div>
      <div className="h-64 overflow-y-auto p-4">
        {messages.map((message, index) => (
          <div key={index} className={`mb-3 ${message.isUser ? 'text-right' : 'text-left'}`}>
            <span className={`inline-block p-2 rounded-lg ${message.isUser ? 'bg-green-100' : 'bg-gray-100'}`}>
              {message.text}
            </span>
          </div>
        ))}
        {isLoading && (
          <div className="text-center">
            <span className="inline-block p-2 rounded-lg bg-gray-100">Thinking...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-3 bg-gray-50 flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Ask about the project..."
          className="flex-grow p-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-green-300"
          disabled={isLoading}
        />
        <button
          onClick={handleSendMessage}
          className="bg-green-500 text-white p-2 rounded-r-lg hover:bg-green-600 transition-colors disabled:bg-gray-400"
          disabled={isLoading}
        >
          <Send className="h-5 w-5" />
        </button>
      </div>
    </div>
  )
}

export default AIChatbot