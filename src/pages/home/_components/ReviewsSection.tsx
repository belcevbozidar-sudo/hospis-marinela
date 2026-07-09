import { motion } from "motion/react";
import { Quote, Star, Heart, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

type Review = {
  name: string;
  date: string;
  text: string;
  highlight: string;
};

const FEATURED_REVIEWS: Review[] = [
  {
    name: "Kat Hristova",
    date: "преди 2 дни",
    text: "Искам от сърце да изкажа своята благодарност към целия екип на Хоспис „Маринела“ за грижите, които положиха за моята майка. Още от първия ден тя беше посрещната с внимание, уважение и човечност. Специални благодарности на г-жа Веселка Терзийска и Калина Петрова за безупречната организация и моралната подкрепа...",
    highlight: "посрещната с внимание, уважение и човечност",
  },
  {
    name: "Илиян Илиев",
    date: "преди година",
    text: "Баба ми се нуждаеше от специализирана грижа заради напреднал Алцхаймер (пълно обездвижване). Хоспис Маринела се грижеха за нея изключително добре. Хигиената е на изключително високо ниво – всичко беше чисто и нямаше никаква миризма. Веселка е медицинско лице и хосписът е регистриран като медицински център...",
    highlight: "опитът ни беше изключително позитивен",
  },
  {
    name: "Yavor Pomakov",
    date: "преди 10 месеца",
    text: "Благодаря на екипа на хоспис Маринела за осигуряването на едни изключително професионални грижи за моя баща. Помощта беше за цялото ни семейство, а отношението безкрайно внимателно. Препоръчвам на всички, които имат нужда да се обърнат към хосписа.",
    highlight: "изключително професионални грижи",
  },
];

const CARD_ACCENTS = [
  "from-emerald-500/10 to-teal-500/5",
  "from-green-500/10 to-emerald-500/5",
  "from-teal-500/10 to-green-500/5",
];

export default function ReviewsSection() {
  return (
    <section id="home-reviews" className="py-16 sm:py-20 bg-primary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent/15 text-accent text-sm font-semibold mb-4"
          >
            <Heart className="h-4 w-4 fill-accent" />
            <span>Обратна връзка</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="font-serif text-3xl sm:text-4xl font-bold text-white mb-4"
            style={{ textShadow: "0 2px 8px rgba(0,0,0,0.5), 0 4px 20px rgba(0,0,0,0.3)" }}
          >
            Какво казват хората за нас
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-white/80 max-w-2xl mx-auto text-sm sm:text-base"
          >
            Споделени отзиви и искрени мнения от близки на нашите пациенти, публикувани в нашия Google профил.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {FEATURED_REVIEWS.map((review, index) => {
            const initials = review.name
              .split(" ")
              .map((w) => w[0])
              .join("")
              .slice(0, 2)
              .toUpperCase();

            return (
              <motion.div
                key={review.name}
                initial={{ opacity: 0, y: 50, filter: "blur(8px)", scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.15,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                className="group relative"
              >
                <div
                  className={`bg-white/80 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 h-full flex flex-col bg-gradient-to-br ${CARD_ACCENTS[index % CARD_ACCENTS.length]}`}
                >
                  <Quote className="h-8 w-8 text-primary/20 mb-4 shrink-0" />
                  
                  <div className="flex gap-0.5 mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                    ))}
                  </div>

                  <p className="text-primary font-serif text-lg font-semibold italic mb-4 leading-snug">
                    {`"${review.highlight}"`}
                  </p>

                  <p className="text-sm sm:text-base text-foreground/80 leading-relaxed flex-1">
                    {review.text}
                  </p>

                  <div className="flex items-center gap-3 mt-6 pt-5 border-t border-primary/10">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <span className="text-xs font-bold text-primary">{initials}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground text-sm">
                        {review.name}
                      </p>
                      <p className="text-[10px] text-foreground/60">
                        {review.date} • Близък на пациент
                      </p>
                    </div>
                    <Heart className="h-4 w-4 text-red-400/60 ml-auto shrink-0" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Link
              to="/reviews"
              className="inline-flex items-center gap-2 rounded-xl px-8 py-4 text-base font-semibold bg-accent text-accent-foreground hover:bg-accent/90 transition-all shadow-lg hover:shadow-xl cursor-pointer group"
            >
              Вижте всички отзиви ({25})
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
