import { useTranslations } from 'next-intl';

import { Search } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
     

      {/* Announcement Banner */}
      {/* <div className="bg-gradient-to-r from-gray-900 to-gray-800 py-2 text-center">
        <span className="text-sm">
          🎉 Introducing Mkdirs on <span className="font-bold">X</span>
        </span>
      </div> */}

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          The Ultimate{" "}
          <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-purple-800 text-transparent bg-clip-text">
            Directory Website Template
          </span>
        </h1>
        <p className="text-gray-400 max-w-3xl mx-auto mb-12">
          This is a demo directory website built with Mkdirs, with which you can launch
          any trending and profitable directory website in minutes without hassle.
        </p>
        
        <div className="max-w-2xl mx-auto relative">
          <Input
            placeholder="Search any products you need"
            className="w-full bg-gray-900 border-gray-800 pl-4 pr-10 py-6"
          />
          <Button 
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2"
          >
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="container mx-auto px-4 mb-8">
        <div className="flex flex-wrap gap-4 justify-between items-center">
          <Select>
            <SelectTrigger className="w-[200px] bg-gray-900 border-gray-800">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="entertainment">Entertainment</SelectItem>
              <SelectItem value="sports">Sports</SelectItem>
              <SelectItem value="education">Education</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-[200px] bg-gray-900 border-gray-800">
              <SelectValue placeholder="All Tags" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Tags</SelectItem>
              <SelectItem value="android">#android</SelectItem>
              <SelectItem value="linux">#linux</SelectItem>
              <SelectItem value="google">#google</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-[200px] bg-gray-900 border-gray-800">
              <SelectValue placeholder="No Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">No Filter</SelectItem>
              <SelectItem value="popular">Popular</SelectItem>
              <SelectItem value="recent">Recent</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-[200px] bg-gray-900 border-gray-800">
              <SelectValue placeholder="Sort by Time (dsc)" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="dsc">Sort by Time (dsc)</SelectItem>
              <SelectItem value="asc">Sort by Time (asc)</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" className="border-gray-800">
            Reset
          </Button>
        </div>
      </div>

      {/* Grid */}
      <div className="container mx-auto px-4 pb-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-gray-900 rounded-lg overflow-hidden">
            <Image
              src="/placeholder.svg?height=200&width=400"
              alt="Sparklers"
              width={400}
              height={200}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <div className="flex gap-2 mb-4">
                <span className="px-2 py-1 bg-gray-800 rounded text-sm">Entertainment</span>
                <span className="px-2 py-1 bg-gray-800 rounded text-sm">Sports</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">item14</h3>
              <p className="text-gray-400 mb-4">
                Renders an accessible label associated with controls. If the item is featured, it will be displayed in the...
              </p>
              <div className="flex gap-2">
                <span className="text-gray-500 text-sm">#android</span>
                <span className="text-gray-500 text-sm">#linux</span>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-gray-900 rounded-lg overflow-hidden">
            <Image
              src="/placeholder.svg?height=200&width=400"
              alt="Mountain landscape"
              width={400}
              height={200}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <div className="flex gap-2 mb-4">
                <span className="px-2 py-1 bg-gray-800 rounded text-sm">Sports</span>
                <span className="px-2 py-1 bg-gray-800 rounded text-sm">Education</span>
                <span className="px-2 py-1 bg-gray-800 rounded text-sm">Lifestyle</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                <span className="text-purple-500">☘</span>
                item18
              </h3>
              <p className="text-gray-400 mb-4">
                Performant, flexible and extensible forms with easy-to-use validation.
              </p>
              <div className="flex gap-2">
                <span className="text-gray-500 text-sm">#google</span>
                <span className="text-gray-500 text-sm">#linux</span>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-gray-900 rounded-lg overflow-hidden">
            <Image
              src="/placeholder.svg?height=200&width=400"
              alt="Orange trees"
              width={400}
              height={200}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <div className="flex gap-2 mb-4">
                <span className="px-2 py-1 bg-gray-800 rounded text-sm">Business</span>
                <span className="px-2 py-1 bg-gray-800 rounded text-sm">Sports</span>
                <span className="px-2 py-1 bg-gray-800 rounded text-sm">Finance</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">item6</h3>
              <p className="text-gray-400 mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam efficitur consequat nunc.
              </p>
              <div className="flex gap-2">
                <span className="text-gray-500 text-sm">#google</span>
                <span className="text-gray-500 text-sm">#linux</span>
              </div>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-gray-900 rounded-lg overflow-hidden">
            <Image
              src="/placeholder.svg?height=200&width=400"
              alt="City skyline"
              width={400}
              height={200}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <div className="flex gap-2 mb-4">
                <span className="px-2 py-1 bg-gray-800 rounded text-sm">Technology</span>
                <span className="px-2 py-1 bg-gray-800 rounded text-sm">Business</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">item23</h3>
              <p className="text-gray-400 mb-4">
                Innovative solutions for modern urban challenges. Explore smart city technologies.
              </p>
              <div className="flex gap-2">
                <span className="text-gray-500 text-sm">#smartcity</span>
                <span className="text-gray-500 text-sm">#innovation</span>
              </div>
            </div>
          </div>

          {/* Card 5 */}
          <div className="bg-gray-900 rounded-lg overflow-hidden">
            <Image
              src="/placeholder.svg?height=200&width=400"
              alt="Healthy food"
              width={400}
              height={200}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <div className="flex gap-2 mb-4">
                <span className="px-2 py-1 bg-gray-800 rounded text-sm">Health</span>
                <span className="px-2 py-1 bg-gray-800 rounded text-sm">Lifestyle</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                <span className="text-green-500">🥗</span>
                item9
              </h3>
              <p className="text-gray-400 mb-4">
                Discover delicious and nutritious recipes for a healthier you. Easy-to-follow meal plans.
              </p>
              <div className="flex gap-2">
                <span className="text-gray-500 text-sm">#healthyfood</span>
                <span className="text-gray-500 text-sm">#nutrition</span>
              </div>
            </div>
          </div>

          {/* Card 6 */}
          <div className="bg-gray-900 rounded-lg overflow-hidden">
            <Image
              src="/placeholder.svg?height=200&width=400"
              alt="Coding setup"
              width={400}
              height={200}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <div className="flex gap-2 mb-4">
                <span className="px-2 py-1 bg-gray-800 rounded text-sm">Technology</span>
                <span className="px-2 py-1 bg-gray-800 rounded text-sm">Education</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">item31</h3>
              <p className="text-gray-400 mb-4">
                Master the art of coding with our comprehensive tutorials and resources.
              </p>
              <div className="flex gap-2">
                <span className="text-gray-500 text-sm">#coding</span>
                <span className="text-gray-500 text-sm">#webdev</span>
              </div>
            </div>
          </div>

          {/* Card 7 */}
          <div className="bg-gray-900 rounded-lg overflow-hidden">
            <Image
              src="/placeholder.svg?height=200&width=400"
              alt="Travel destination"
              width={400}
              height={200}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <div className="flex gap-2 mb-4">
                <span className="px-2 py-1 bg-gray-800 rounded text-sm">Travel</span>
                <span className="px-2 py-1 bg-gray-800 rounded text-sm">Lifestyle</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">item42</h3>
              <p className="text-gray-400 mb-4">
                Explore breathtaking destinations and plan your next adventure with our travel guides.
              </p>
              <div className="flex gap-2">
                <span className="text-gray-500 text-sm">#travel</span>
                <span className="text-gray-500 text-sm">#adventure</span>
              </div>
            </div>
          </div>

          {/* Card 8 */}
          <div className="bg-gray-900 rounded-lg overflow-hidden">
            <Image
              
              src="/placeholder.svg?height=200&width=400"
              alt="Fitness equipment"
              width={400}
              height={200}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <div className="flex gap-2 mb-4">
                <span className="px-2 py-1 bg-gray-800 rounded text-sm">Fitness</span>
                <span className="px-2 py-1 bg-gray-800 rounded text-sm">Health</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                <span className="text-blue-500">💪</span>
                item15
              </h3>
              <p className="text-gray-400 mb-4">
                Achieve your fitness goals with our curated workout plans and expert advice.
              </p>
              <div className="flex gap-2">
                <span className="text-gray-500 text-sm">#fitness</span>
                <span className="text-gray-500 text-sm">#workout</span>
              </div>
            </div>
          </div>

          {/* Card 9 */}
          <div className="bg-gray-900 rounded-lg overflow-hidden">
            <Image
              src="/placeholder.svg?height=200&width=400"
              alt="Art supplies"
              width={400}
              height={200}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <div className="flex gap-2 mb-4">
                <span className="px-2 py-1 bg-gray-800 rounded text-sm">Art</span>
                <span className="px-2 py-1 bg-gray-800 rounded text-sm">Creativity</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">item27</h3>
              <p className="text-gray-400 mb-4">
                Unleash your creativity with our art tutorials and inspiration for all skill levels.
              </p>
              <div className="flex gap-2">
                <span className="text-gray-500 text-sm">#art</span>
                <span className="text-gray-500 text-sm">#creativity</span>
              </div>
            </div>
          </div>

          {/* Card 10 */}
          <div className="bg-gray-900 rounded-lg overflow-hidden">
            <Image
              src="/placeholder.svg?height=200&width=400"
              alt="Financial charts"
              width={400}
              height={200}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <div className="flex gap-2 mb-4">
                <span className="px-2 py-1 bg-gray-800 rounded text-sm">Finance</span>
                <span className="px-2 py-1 bg-gray-800 rounded text-sm">Business</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">item38</h3>
              <p className="text-gray-400 mb-4">
                Navigate the world of finance with our expert insights and investment strategies.
              </p>
              <div className="flex gap-2">
                <span className="text-gray-500 text-sm">#finance</span>
                <span className="text-gray-500 text-sm">#investing</span>
              </div>
            </div>
          </div>

          {/* Card 11 */}
          <div className="bg-gray-900 rounded-lg overflow-hidden">
            <Image
              src="/placeholder.svg?height=200&width=400"
              alt="Music instruments"
              width={400}
              height={200}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <div className="flex gap-2 mb-4">
                <span className="px-2 py-1 bg-gray-800 rounded text-sm">Music</span>
                <span className="px-2 py-1 bg-gray-800 rounded text-sm">Entertainment</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                <span className="text-yellow-500">🎵</span>
                item20
              </h3>
              <p className="text-gray-400 mb-4">
                Explore the world of music with our lessons, reviews, and industry insights.
              </p>
              <div className="flex gap-2">
                <span className="text-gray-500 text-sm">#music</span>
                <span className="text-gray-500 text-sm">#instruments</span>
              </div>
            </div>
          </div>

          {/* Card 12 */}
          <div className="bg-gray-900 rounded-lg overflow-hidden">
            <Image
              src="/placeholder.svg?height=200&width=400"
              alt="Gardening tools"
              width={400}
              height={200}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <div className="flex gap-2 mb-4">
                <span className="px-2 py-1 bg-gray-800 rounded text-sm">Gardening</span>
                <span className="px-2 py-1 bg-gray-800 rounded text-sm">Lifestyle</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">item33</h3>
              <p className="text-gray-400 mb-4">
                Cultivate your green thumb with our gardening tips, plant care guides, and landscaping ideas.
              </p>
              <div className="flex gap-2">
                <span className="text-gray-500 text-sm">#gardening</span>
                <span className="text-gray-500 text-sm">#plants</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pagination */}
      <div className="container mx-auto px-4 pb-16">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>

      {/* Newsletter Section */}
      <div className="mt-16 rounded-lg bg-gray-900 p-8 text-center">
        <span className="text-sm font-medium text-purple-500">NEWSLETTER</span>
        <h2 className="mt-3 text-3xl font-semibold text-white">Join the Community</h2>
        <p className="mt-2 text-gray-400">
          Subscribe to our newsletter for the latest news and updates
        </p>
        <div className="mx-auto mt-6 flex max-w-md gap-2">
          <Input
            type="email"
            placeholder="Enter your email"
            className="bg-gray-950 border-gray-800"
          />
          <Button variant="outline" className="bg-white text-black hover:bg-gray-200">
            →
          </Button>
        </div>
      </div>

    </div>
  )
}