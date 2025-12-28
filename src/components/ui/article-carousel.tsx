"use client";

import { useEffect, useState, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { BookOpen, Clock, User, Calendar, X, ChevronLeft, ChevronRight } from "lucide-react";

// Article Interface
export interface FullArticle {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  content: string;
}

// Full Article Content
export const FULL_ARTICLES: FullArticle[] = [
  {
    id: '1',
    title: 'The Ultimate Guide to Pet Adoption',
    excerpt: 'Everything you need to know before bringing a new furry friend home. From preparation to the first few weeks.',
    image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=300&fit=crop',
    author: 'Dr. Sarah Johnson',
    date: 'March 15, 2024',
    readTime: '8 min',
    category: 'Adoption',
    content: `
      <h2>Understanding Pet Adoption</h2>
      <p>Adopting a pet is one of the most rewarding decisions you can make. Not only do you gain a loyal companion, but you also save a life and make room for another animal in need. However, adoption is a serious commitment that requires careful consideration and preparation.</p>

      <h3>Before You Adopt: Important Considerations</h3>
      <p>Before visiting a shelter, ask yourself these crucial questions:</p>
      <ul>
        <li><strong>Time Commitment:</strong> Do you have 2-3 hours daily for walks, play, training, and care?</li>
        <li><strong>Financial Readiness:</strong> Can you afford food, veterinary care, grooming, and emergency expenses?</li>
        <li><strong>Living Situation:</strong> Does your home allow pets? Do you have adequate space?</li>
        <li><strong>Lifestyle Match:</strong> Does your activity level match the pet's energy needs?</li>
        <li><strong>Long-term Planning:</strong> Can you commit for 10-20 years?</li>
      </ul>

      <h3>Choosing the Right Pet</h3>
      <p>Different pets have different needs. Consider these factors:</p>
      <p><strong>Dogs:</strong> Require daily walks, training, and social interaction. High-energy breeds need extensive exercise. Senior dogs are often calmer and already trained.</p>
      <p><strong>Cats:</strong> More independent but still need daily interaction, playtime, and mental stimulation. Indoor cats require environmental enrichment.</p>
      <p><strong>Age Matters:</strong> Puppies and kittens require intensive training and supervision. Adult pets are often already trained and their personalities are established. Senior pets are wonderful companions who deserve loving homes.</p>

      <h3>Preparing Your Home</h3>
      <p>Pet-proofing is essential before your new friend arrives:</p>
      <ul>
        <li>Remove toxic plants (lilies, azaleas, sago palms)</li>
        <li>Secure electrical cords and small objects</li>
        <li>Store cleaning products and medications safely</li>
        <li>Set up a comfortable sleeping area</li>
        <li>Designate feeding and water stations</li>
        <li>Create a safe outdoor space or litter box area</li>
      </ul>

      <h3>The First Few Weeks</h3>
      <p>The transition period is critical. Follow the 3-3-3 rule:</p>
      <p><strong>First 3 Days:</strong> Your pet may feel overwhelmed and scared. They might not eat much or hide. This is normal. Give them space and time to adjust.</p>
      <p><strong>First 3 Weeks:</strong> Your pet starts to settle in and understand the routine. Begin basic training and establish house rules consistently.</p>
      <p><strong>First 3 Months:</strong> Your pet feels comfortable and their true personality emerges. Continue reinforcing good behaviors and building your bond.</p>

      <p><strong>Remember:</strong> Patience, consistency, and love are the keys to successful pet adoption. Your rescued pet may have had a difficult past, but with your care, they'll have a beautiful future.</p>
    `
  },
  {
    id: '2',
    title: 'Understanding Pet Anxiety and Stress',
    excerpt: 'Learn to recognize signs of anxiety in your pets and discover effective ways to help them feel calm and secure.',
    image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400&h=300&fit=crop',
    author: 'Dr. Michael Chen',
    date: 'March 12, 2024',
    readTime: '6 min',
    category: 'Health',
    content: `
      <h2>Recognizing Anxiety in Pets</h2>
      <p>Just like humans, pets experience anxiety and stress. Understanding the signs and causes helps you provide better care and support for your furry companions.</p>

      <h3>Common Signs of Anxiety in Dogs</h3>
      <ul>
        <li>Excessive barking, whining, or howling</li>
        <li>Destructive behavior (chewing furniture, digging)</li>
        <li>Pacing or restlessness</li>
        <li>Trembling or shaking</li>
        <li>Hiding or trying to escape</li>
        <li>Loss of appetite</li>
        <li>Accidents in the house despite being house-trained</li>
      </ul>

      <h3>Common Signs of Anxiety in Cats</h3>
      <ul>
        <li>Hiding for extended periods</li>
        <li>Excessive grooming (leading to bald patches)</li>
        <li>Urinating outside the litter box</li>
        <li>Decreased appetite</li>
        <li>Aggression or irritability</li>
        <li>Excessive meowing or vocalization</li>
      </ul>

      <h3>Common Causes of Pet Anxiety</h3>
      <p><strong>Separation Anxiety:</strong> The most common form occurs when pets are left alone. They become distressed without their human companions.</p>
      <p><strong>Environmental Changes:</strong> Moving to a new home, rearranging furniture, new family members, or new pets can trigger anxiety.</p>
      <p><strong>Loud Noises:</strong> Thunderstorms, fireworks, construction, or vacuum cleaners can terrify sensitive pets.</p>

      <h3>Techniques to Reduce Anxiety</h3>
      <p><strong>Gradual Desensitization:</strong> Slowly expose your pet to anxiety triggers at low intensity, rewarding calm behavior.</p>
      <p><strong>Exercise:</strong> Physical activity reduces stress hormones and releases endorphins. Ensure your pet gets adequate daily exercise.</p>
      <p><strong>Safe Spaces:</strong> Provide a quiet, comfortable area where your pet can retreat.</p>

      <p><strong>Remember:</strong> Anxiety is not disobedience. It's a genuine emotional state that requires compassion and appropriate intervention.</p>
    `
  },
  {
    id: '3',
    title: 'Best Indoor Activities for Your Dog',
    excerpt: 'Keep your dog entertained and mentally stimulated with these fun indoor activities perfect for rainy days.',
    image: 'https://images.unsplash.com/photo-1558788353-f76d92427f16?w=400&h=300&fit=crop',
    author: 'Emma Williams',
    date: 'March 10, 2024',
    readTime: '5 min',
    category: 'Activities',
    content: `
      <h2>Keeping Your Dog Active Indoors</h2>
      <p>Bad weather or extreme temperatures sometimes mean outdoor activities aren't possible. But your dog still needs mental and physical stimulation! Here are creative indoor activities to keep your pup happy and tired.</p>

      <h3>1. Hide and Seek</h3>
      <p>This classic game works wonderfully with dogs! Have your dog sit and stay, then hide somewhere in your home. Call their name and praise enthusiastically when they find you.</p>
      <p><strong>Variations:</strong> Hide treats around the house, hide toys, or play with multiple family members.</p>

      <h3>2. Puzzle Toys and Food Dispensers</h3>
      <p>Puzzle toys challenge your dog's problem-solving skills while providing rewards.</p>
      <ul>
        <li><strong>Kong toys:</strong> Fill with peanut butter and freeze</li>
        <li><strong>Snuffle mats:</strong> Hide kibble for natural foraging</li>
        <li><strong>DIY puzzles:</strong> Hide treats in a muffin tin covered with tennis balls</li>
      </ul>

      <h3>3. Training Sessions</h3>
      <p>Indoor time is perfect for teaching new tricks. Keep sessions short (5-10 minutes) and fun.</p>
      <p><strong>Tricks to Try:</strong> Shake, roll over, play dead, spin, touch, find it, go to mat</p>

      <h3>4. Indoor Agility Course</h3>
      <p>Create obstacles using household items:</p>
      <ul>
        <li>Jump over pillows</li>
        <li>Weave through chair legs</li>
        <li>Crawl under blanket tunnels</li>
        <li>Walk on a low balance beam</li>
      </ul>

      <h3>5. Scent Work Games</h3>
      <p>Put your dog's nose to work:</p>
      <ul>
        <li>Hide treats in boxes</li>
        <li>Create scent trails</li>
        <li>Play "which hand" with treats</li>
        <li>Hide specific toys by name</li>
      </ul>

      <p><strong>Remember:</strong> A tired dog is a happy dog! Indoor activities can be just as fulfilling as outdoor exercise when done creatively.</p>
    `
  },
  {
    id: '4',
    title: 'Senior Pet Care: What You Need to Know',
    excerpt: 'As pets age, their needs change. Discover how to provide the best care for your senior companion.',
    image: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?w=400&h=300&fit=crop',
    author: 'Dr. Lisa Anderson',
    date: 'March 8, 2024',
    readTime: '7 min',
    category: 'Health',
    content: `
      <h2>Understanding Senior Pets</h2>
      <p>Pets age faster than humans. Dogs are generally considered senior at 7-10 years (depending on size), while cats reach senior status around 11 years old.</p>

      <h3>Common Age-Related Changes</h3>
      <p><strong>Physical Changes:</strong></p>
      <ul>
        <li>Decreased energy and stamina</li>
        <li>Grey hair around the muzzle</li>
        <li>Cloudy eyes</li>
        <li>Reduced mobility and stiffness</li>
        <li>Dental disease</li>
        <li>Weight changes</li>
      </ul>

      <p><strong>Behavioral Changes:</strong></p>
      <ul>
        <li>Sleeping more</li>
        <li>Confusion or disorientation</li>
        <li>Changes in social behavior</li>
        <li>House soiling accidents</li>
        <li>Decreased interest in play</li>
      </ul>

      <h3>Health Monitoring</h3>
      <p>Senior pets should see the vet every 6 months for comprehensive examinations including blood work, urinalysis, and dental evaluation.</p>

      <h3>Nutrition for Senior Pets</h3>
      <ul>
        <li>Lower calories (reduced activity)</li>
        <li>Higher quality protein</li>
        <li>Joint support supplements</li>
        <li>Omega-3 fatty acids</li>
        <li>Easy to digest formulas</li>
      </ul>

      <h3>Home Modifications</h3>
      <ul>
        <li>Install ramps for stairs</li>
        <li>Use non-slip rugs</li>
        <li>Provide orthopedic beds</li>
        <li>Keep essentials on one floor</li>
        <li>Use nightlights</li>
      </ul>

      <h3>Quality of Life</h3>
      <p>Regularly evaluate considering: pain control, appetite, hydration, hygiene, happiness, and mobility.</p>

      <p><strong>Remember:</strong> Your senior pet has given you years of love. Now it's your turn to ensure their golden years are comfortable and filled with love.</p>
    `
  },
  {
    id: '5',
    title: 'Creating a Pet-Friendly Home',
    excerpt: 'Transform your living space into a safe and comfortable haven for your pets with these practical tips.',
    image: 'https://images.unsplash.com/photo-1560807707-8cc77767d783?w=400&h=300&fit=crop',
    author: 'James Miller',
    date: 'March 5, 2024',
    readTime: '6 min',
    category: 'Lifestyle',
    content: `
      <h2>Designing Your Home with Pets in Mind</h2>
      <p>Creating a pet-friendly home means designing a space where your pets feel safe, comfortable, and stimulated while maintaining a beautiful, functional home.</p>

      <h3>Safety First: Pet-Proofing Essentials</h3>
      <ul>
        <li>Secure cabinets with cleaning supplies</li>
        <li>Remove or secure toxic plants</li>
        <li>Cover electrical cords</li>
        <li>Install baby gates where needed</li>
        <li>Secure windows and balconies</li>
        <li>Remove small choking hazards</li>
      </ul>

      <h3>Flooring Choices</h3>
      <p><strong>Best Options:</strong> Luxury vinyl, tile, sealed concrete - durable, scratch-resistant, easy to clean</p>
      <p><strong>Avoid:</strong> Light-colored carpet (stains), unsealed hardwood (water damage)</p>

      <h3>Furniture Selection</h3>
      <ul>
        <li>Choose durable, washable fabrics</li>
        <li>Leather or microfiber resists pet hair</li>
        <li>Darker colors hide stains</li>
        <li>Slipcovers for easy cleaning</li>
        <li>Pet-friendly furniture protectors</li>
      </ul>

      <h3>Designated Pet Spaces</h3>
      <p>Create special areas for your pets:</p>
      <ul>
        <li>Cozy sleeping nooks</li>
        <li>Feeding stations</li>
        <li>Play areas with toys</li>
        <li>Window perches for cats</li>
        <li>Indoor potty areas if needed</li>
      </ul>

      <h3>Storage Solutions</h3>
      <ul>
        <li>Built-in food and supply storage</li>
        <li>Toy baskets in each room</li>
        <li>Hidden litter boxes</li>
        <li>Leash and collar hooks by the door</li>
        <li>Grooming supply organizers</li>
      </ul>

      <h3>Outdoor Spaces</h3>
      <ul>
        <li>Secure fencing (check for escape routes)</li>
        <li>Shaded rest areas</li>
        <li>Water stations</li>
        <li>Pet-safe plants and landscaping</li>
        <li>Designated bathroom areas</li>
      </ul>

      <p><strong>Remember:</strong> A pet-friendly home benefits everyone. Your pets are happier and safer, and you'll have less stress about damage or accidents.</p>
    `
  },
  {
    id: '6',
    title: 'The Benefits of Regular Vet Checkups',
    excerpt: 'Preventive care is key to keeping your pet healthy. Learn why regular vet visits are essential.',
    image: 'https://images.unsplash.com/photo-1530041539828-114de669390e?w=400&h=300&fit=crop',
    author: 'Dr. Rachel Green',
    date: 'March 3, 2024',
    readTime: '5 min',
    category: 'Health',
    content: `
      <h2>The Importance of Preventive Care</h2>
      <p>Regular veterinary checkups are one of the best investments you can make in your pet's health and longevity. Prevention is always better than treatment.</p>

      <h3>Recommended Checkup Schedule</h3>
      <ul>
        <li><strong>Puppies/Kittens:</strong> Every 3-4 weeks until 16 weeks old</li>
        <li><strong>Adult Pets:</strong> Once annually</li>
        <li><strong>Senior Pets:</strong> Every 6 months</li>
        <li><strong>Chronic Conditions:</strong> As recommended by your vet</li>
      </ul>

      <h3>What Happens During a Checkup</h3>
      <p><strong>Physical Examination:</strong></p>
      <ul>
        <li>Weight and body condition assessment</li>
        <li>Heart and lung evaluation</li>
        <li>Dental examination</li>
        <li>Eye and ear checks</li>
        <li>Skin and coat inspection</li>
        <li>Lymph node palpation</li>
        <li>Abdominal palpation</li>
      </ul>

      <h3>Preventive Treatments</h3>
      <ul>
        <li><strong>Vaccinations:</strong> Protection against serious diseases</li>
        <li><strong>Parasite Prevention:</strong> Heartworm, flea, tick protection</li>
        <li><strong>Dental Care:</strong> Professional cleanings</li>
        <li><strong>Blood Work:</strong> Baseline health markers</li>
      </ul>

      <h3>Early Disease Detection</h3>
      <p>Many conditions show no symptoms until advanced stages. Regular checkups can detect:</p>
      <ul>
        <li>Kidney disease</li>
        <li>Diabetes</li>
        <li>Heart disease</li>
        <li>Cancer</li>
        <li>Thyroid problems</li>
        <li>Arthritis</li>
      </ul>

      <h3>Cost Savings</h3>
      <p>Preventive care costs less than treating advanced diseases. Early detection means:</p>
      <ul>
        <li>Simpler treatments</li>
        <li>Better outcomes</li>
        <li>Lower overall costs</li>
        <li>Longer, healthier life for your pet</li>
      </ul>

      <h3>Building a Relationship</h3>
      <p>Regular visits help your pet become comfortable with the vet, making emergency visits less stressful.</p>

      <h3>Questions to Ask Your Vet</h3>
      <ul>
        <li>Is my pet at a healthy weight?</li>
        <li>What diet is best?</li>
        <li>Are vaccinations up to date?</li>
        <li>Any concerns about behavior?</li>
        <li>When should we schedule the next visit?</li>
      </ul>

      <p><strong>Remember:</strong> Your veterinarian is your partner in keeping your pet healthy. Don't wait for problems to arise - preventive care is the key to a long, happy life together.</p>
    `
  }
];

// Article Modal Component
function ArticleModal({ article, onClose }: { article: FullArticle; onClose: () => void }) {
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = 'hidden';
    return () => {
      if (typeof document !== "undefined") {
        document.body.style.overflow = 'unset';
      }
    };
  }, []);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-4xl max-h-[90vh] bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-white/20"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-white/30 p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BookOpen className="text-[#F4A259]" size={28} />
            <span className="text-sm font-medium text-[#F4A259] bg-[#F4A259]/10 px-3 py-1 rounded-full">
              {article.category}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close article"
          >
            <X size={24} className="text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-88px)] p-8 bg-white/70 backdrop-blur-lg">
          {/* Featured Image */}
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-64 object-cover rounded-xl mb-6"
          />

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-[var(--charcoal)] mb-4">
            {article.title}
          </h1>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--grey-medium)] mb-8 pb-6 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <User size={16} />
              <span className="font-medium">{article.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              <span>{article.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} />
              <span>{article.readTime} read</span>
            </div>
          </div>

          {/* Article Content */}
          <div
            className="prose prose-lg max-w-none article-content"
            dangerouslySetInnerHTML={{ __html: article.content }}
            style={{
              color: 'var(--charcoal)',
              lineHeight: '1.8'
            }}
          />
        </div>
      </div>

      <style jsx>{`
        .article-content h2 {
          font-size: 1.75rem;
          font-weight: 700;
          color: var(--charcoal);
          margin-top: 2rem;
          margin-bottom: 1rem;
        }
        .article-content h3 {
          font-size: 1.375rem;
          font-weight: 600;
          color: #F4A259;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
        }
        .article-content p {
          margin-bottom: 1rem;
          color: var(--grey-medium);
        }
        .article-content ul {
          margin-left: 1.5rem;
          margin-bottom: 1rem;
          list-style-type: disc;
        }
        .article-content li {
          margin-bottom: 0.5rem;
          color: var(--grey-medium);
        }
        .article-content strong {
          color: var(--charcoal);
          font-weight: 600;
        }
      `}</style>
    </div>
  );
}

// Article Carousel Component
interface ArticleCarouselProps {
  articles: FullArticle[];
}

export function ArticleCarousel({ articles }: ArticleCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
    skipSnaps: false,
  });

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [selectedArticle, setSelectedArticle] =
    useState<FullArticle | null>(null);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <>
      {/* OUTER RELATIVE WRAPPER (owns arrows + padding) */}
      <div className="relative px-6 md:px-0">
        {/* LEFT ARROW - Desktop: outside container, Mobile: inside */}
        {canScrollPrev && (
          <button
            onClick={scrollPrev}
            className="absolute left-4 md:-left-16 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-[#F4A259]/20 hidden md:flex items-center justify-center"
            aria-label="Previous articles"
          >
            <ChevronLeft size={24} className="text-[#F4A259]" />
          </button>
        )}

        {/* RIGHT ARROW - Desktop: outside container, Mobile: inside */}
        {canScrollNext && (
          <button
            onClick={scrollNext}
            className="absolute right-4 md:-right-16 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-[#F4A259]/20 hidden md:flex items-center justify-center"
            aria-label="Next articles"
          >
            <ChevronRight size={24} className="text-[#F4A259]" />
          </button>
        )}

        {/* EMBLA SCROLL AREA */}
        <div ref={emblaRef} className="overflow-hidden">
          <div className="flex gap-6 md:gap-6">
            {articles.map((article) => (
              <div
                key={article.id}
                className="shrink-0 grow-0 basis-[90%] sm:basis-[70%] md:basis-[calc(33.333%-1rem)]"
              >
                <div
                  onClick={() => setSelectedArticle(article)}
                  className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer border-2 border-[#F4A259]/20 hover:border-[#F4A259]/40 h-full"
                >
                  <div className="relative overflow-hidden h-56">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="bg-[#F4A259] text-white text-xs px-4 py-1.5 rounded-full font-medium shadow-lg">
                        {article.category}
                      </span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  </div>

                  <div className="p-5">
                    <h3 className="text-lg font-bold text-[var(--charcoal)] mb-2 line-clamp-2 group-hover:text-[#F4A259] transition-all">
                      {article.title}
                    </h3>
                    <p className="text-sm text-[var(--grey-medium)] mb-3 line-clamp-2">
                      {article.excerpt}
                    </p>

                    <div className="flex flex-col gap-2 text-sm text-[var(--grey-medium)]">
                      <div className="flex items-center gap-2">
                        <User size={16} />
                        <span className="font-medium">{article.author}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Clock size={16} />
                          <span>{article.readTime}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar size={16} />
                          <span>{article.date}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ARTICLE MODAL */}
      {selectedArticle && (
        <ArticleModal
          article={selectedArticle}
          onClose={() => setSelectedArticle(null)}
        />
      )}
    </>
  );
}