import { motion } from "motion/react";
import { ChevronRight, Quote, Star, Heart, Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";

type Review = {
  name: string;
  text: string;
  highlight?: string;
};

const REVIEWS: Review[] = [
  {
    name: "Iva Petkova",
    text: "Много сме доволни от грижата, положена за нашата майка. Пак бихме ползвали услугите на Хоспис \"Маринела\".",
    highlight: "Пак бихме ползвали услугите",
  },
  {
    name: "Yavor Pomakov",
    text: "Благодаря на екипа на хоспис Маринела за осигуряването на едни изключително професионални грижи за моя баща. Помощта беше за цялото ни семейство, а отношението безкрайно внимателно. Препоръчвам на всички, които имат нужда да се обърнат към хоспис Маринела.",
    highlight: "изключително професионални грижи",
  },
  {
    name: "Борис Тосков",
    text: "Искам да благодаря на целия екип на Хоспис Маринела и на г-жа Веселка Терзийска, за положените грижи за баба ми. Изключително коректни и отзивчиви, винаги са съдействали с каквото е необходимо и се стараеха да направят престоя на баба ми по-лек.",
    highlight: "Изключително коректни и отзивчиви",
  },
  {
    name: "Даниела Христова",
    text: "Най-сърдечни благодарности на управителката Веселка Терзийска и целия екип за грижите за майка ми!",
    highlight: "Най-сърдечни благодарности",
  },
  {
    name: "Христо Христов",
    text: "Благодаря за отдадеността и професионализма на целия екип, грижите които полагаха за моята баба в продължение на година са неоценими!",
    highlight: "грижите са неоценими",
  },
  {
    name: "Стойчо Василев",
    text: "Човек е трудно да се довери, когато става въпрос за живота и здравето на своите близки, но съм очарован от обстановката, човешкото отношение и професионализъм в хоспис Маринела!!! Благодаря ви от сърце, че ви има и помагате така сърцато на нашите близки!!!",
    highlight: "очарован от обстановката и професионализъм",
  },
  {
    name: "Райчо Даскалов",
    text: "Майка ми беше приета в хоспис \"Маринела\" с депресия. Дълги години живее сама. Не иска да идва в града, защото не й понася. След броени дни благодарение на грижите на целия екип и техният професионализъм, вече е добре. Много любезни, отзивчиви и сърцати хора. Добра обратна връзка. Благодарим за положените усилия и грижи на управителя г-жа Терзийска и целия екип на хосписа. Бъдете здрави. Препоръчвам на всеки, който има нужда от помощ в грижи за близки хора в труден момент от живота им.",
    highlight: "Много любезни, отзивчиви и сърцати хора",
  },
  {
    name: "Илиян Илиев",
    text: "Баба ми се нуждаеше от специализирана грижа в последните етапи на живота си заради напреднал Алцхаймер (пълно обездвижване). След дълго търсене се спрях на Хоспис Маринела. Трудно ми беше да се доверя на някой със здравето на любим човек. Искам да споделя моя опит, който беше изключително позитивен. Хоспис Маринела (Веселка Терзийска, Кали Петрова и целия персонал) се грижеха за баба изключително добре.",
    highlight: "опитът беше изключително позитивен",
  },
  {
    name: "Маня Николова",
    text: "Здравейте, искаме да ви благодарим, че вече повече от година се грижите и поддържате здравето на баба ни, въпреки проблемното й състояние. Благодарим ви, че така помогнахте на нас и на цялото ни семейство да приемем този тежък удар. Благодарим на управителите Калина Петрова и Веселка Терзийска, на всички от медицинския персонал и администрацията за съпричастността и разбирането! Желаем успех на всички ви в упражняването на тази трудна професия. С уважение: Катерина и Маня",
    highlight: "съпричастността и разбирането",
  },
  {
    name: "Антония Янкова",
    text: "Отправям сърдечни поздрави и благодарности към г-жа Терзийска и г-жа Петрова, както и към целият екип на хоспис Маринела! Грижиха се неуморно, с внимание, човечност и висок професионализъм за баща ми, който от лежащо състояние го вдигнаха на крака! За един месец направиха наистина чудеса. Хосписа е подходящ за тежко, лежащо и терминално болни хора. Всички сестри, санитари, рехабилитатори са ангели. Продължавайте все така да вършите добро и доброто със сигурност ще ви се връща! С уважение, Антония Янкова, дъщеря на Константин Куртев",
    highlight: "от лежащо състояние го вдигнаха на крака",
  },
  {
    name: "Стоян Евтимов",
    text: "Изключително сърдечно и човешко отношение към пациентите. Винаги подхождат с разбиране и съдействие. Страхотни медицински специалисти с отношение към болните. Благодарим за всичко, което правите за нас и нашите близки!",
    highlight: "Страхотни медицински специалисти",
  },
  {
    name: "Вероника",
    text: "Трудно ми е да формулирам благодарността си в едно изречение към хората полагащи грижи в Хоспис Маринела! Преди да настаним баба ми в хосписа изпитвах вина! Сега съм спокойна и знам, че сме постъпили по най-правилния начин! Самата тя не спира да изказва благодарности към персонала и храната, още след няколко дни имаше подобрение! Рехабилитаторите ежедневно я раздвижват, винаги е чиста и спретната! Благодаря Ви мили хора за грижите, които полагате за нашите близки!",
    highlight: "сме постъпили по най-правилния начин",
  },
  {
    name: "Виктория Руменова",
    text: "Много любезен и отзивчив персонал, грижат се за пациентите си с желание! Личи си, че са хора със сърца, спазват чудесна хигиена, порциите им са достатъчни, препоръчвам ги!",
    highlight: "хора със сърца",
  },
  {
    name: "Ваня Тонова",
    text: "Много човечно и разбиращо отношение към хората настанени в хоспис Маринела от страна на целия екип. Съдействат на пациента и неговите близки, с каквото могат. Дават ежедневно обратна връзка.",
    highlight: "човечно и разбиращо отношение",
  },
  {
    name: "Борис Медарски",
    text: "Майка ми е в хоспис Маринела от 5 години. След претърпян инцидент и операции в Пирогов се възстанови там от изгаряне последна степен и получава всички нужни грижи за да е добре. Благодарни сме за всички грижи положени за нея.",
    highlight: "получава всички нужни грижи",
  },
  {
    name: "Наталия Костова",
    text: "Здравейте, на скоро се наложи да настаня баща ми в хоспис. Избрах \"Маринела\" и искам да изкажа своите благодарности на Веселка Терзийска и Калина Петрова за топлото посрещане. Баща ми там се възстанови емоционално и физически. Персоналът е много любезен, отнася се добре с пациентите. Храната се сервира точно на време и е в достатъчно количество. Във всяка стая има санитарен възел — тоалетна и баня. Горещо препоръчвам на бъдещи пациенти да отседнат там за възстановяване.",
    highlight: "възстанови емоционално и физически",
  },
  {
    name: "Нели Методиева",
    text: "Изключително доволни сме от професионалното и личното отношение на управителите и персонала на хосписа. Благодарим за всички положени усилия и човещината която показахте.",
    highlight: "професионалното и личното отношение",
  },
  {
    name: "Emiliq Hristova",
    text: "Горещо препоръчвам хоспис Маринела в кв. Овча Купел. Изключително сърдечни, загрижени, съпричастни и коректни. Там видях доволни и обгрижени хора. Приятна и чиста обстановка. Всичко това ме остави с усещането, че нашите родители и близки са спокойни и са на правилното място тогава когато ние за съжаление вече не можем да им помогнем. Сърдечно Благодаря на целия екип.",
    highlight: "доволни и обгрижени хора",
  },
  {
    name: "Анета Йорданова",
    text: "Благодарим Ви за грижите, вниманието, съпричастността към нас. Госпожо Терзийска, госпожо Петрова, и целият екип — благодарим от сърце!",
    highlight: "грижите, вниманието, съпричастността",
  },
];

// Soft color palettes for card accents
const CARD_ACCENTS = [
  "from-emerald-500/10 to-teal-500/5",
  "from-green-500/10 to-emerald-500/5",
  "from-teal-500/10 to-green-500/5",
  "from-lime-500/8 to-emerald-500/5",
  "from-emerald-600/10 to-green-500/5",
];

function ReviewCard({ review, index }: { review: Review; index: number }) {
  const accentIndex = index % CARD_ACCENTS.length;
  const initials = review.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, filter: "blur(8px)", scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: (index % 3) * 0.12 }}
      className="group relative"
    >
      <div
        className={`relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-white/50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 h-full flex flex-col bg-gradient-to-br ${CARD_ACCENTS[accentIndex]}`}
      >
        {/* Quote icon */}
        <Quote className="h-8 w-8 text-primary/20 mb-4 shrink-0" />

        {/* Stars */}
        <div className="flex gap-0.5 mb-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className="h-4 w-4 fill-accent text-accent"
            />
          ))}
        </div>

        {/* Highlight quote */}
        {review.highlight && (
          <p className="text-primary font-serif text-lg sm:text-xl font-semibold italic mb-4 leading-snug">
            {`"${review.highlight}"`}
          </p>
        )}

        {/* Full text */}
        <p className="text-sm sm:text-base text-foreground/80 leading-relaxed flex-1">
          {review.text}
        </p>

        {/* Author */}
        <div className="flex items-center gap-3 mt-6 pt-5 border-t border-primary/10">
          <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <span className="text-sm font-bold text-primary">
              {initials}
            </span>
          </div>
          <div>
            <p className="font-semibold text-foreground text-sm sm:text-base">
              {review.name}
            </p>
            <p className="text-xs text-foreground/60">
              Близък на пациент
            </p>
          </div>
          <Heart className="h-4 w-4 text-red-400/60 ml-auto shrink-0" />
        </div>
      </div>
    </motion.div>
  );
}

export default function ReviewsPage() {
  const navigate = useNavigate();

  return (
    <div>
      {/* Page Hero */}
      <section className="pt-28 sm:pt-36 pb-16 sm:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-center"
          >
            <div className="flex items-center justify-center gap-2 text-sm text-white/80 font-medium mb-6">
              <button
                onClick={() => {
                  navigate("/");
                  window.scrollTo({ top: 0 });
                }}
                className="hover:text-primary transition-colors cursor-pointer"
              >
                Начало
              </button>
              <ChevronRight className="h-4 w-4" />
              <span className="text-primary font-semibold">Отзиви</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white">
              Отзиви и мнения
            </h1>
            <p className="text-lg sm:text-xl text-white/90 mt-4 max-w-3xl mx-auto text-balance">
              Отзиви и мнения от клиенти и пациенти на Хоспис
              {' "Маринела"'}, публикувани от тях в нашия бизнес профил в
              Google или изпратени писмено в нашия офис.
            </p>
            <div className="w-20 h-1 bg-accent rounded-full mt-6 mx-auto" />
          </motion.div>

          {/* Stats bar */}
          <motion.div
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
            className="flex flex-wrap justify-center gap-6 sm:gap-12 mt-10"
          >
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-primary">
                {REVIEWS.length}+
              </div>
              <div className="text-sm text-white/90 font-medium mt-1">
                Отзива
              </div>
            </div>
            <div className="text-center">
              <div className="flex items-center gap-1 justify-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-6 w-6 sm:h-7 sm:w-7 fill-accent text-accent"
                  />
                ))}
              </div>
              <div className="text-sm text-white/90 font-medium mt-1">
                Средна оценка
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-primary">
                15+
              </div>
              <div className="text-sm text-white/90 font-medium mt-1">
                Години доверие
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured review */}
      <section className="pb-12 sm:pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.97, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative bg-primary/95 rounded-3xl p-8 sm:p-12 text-white overflow-hidden"
          >
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

            <div className="relative">
              <Quote className="h-12 w-12 text-white/20 mb-4" />
              <p className="font-serif text-xl sm:text-2xl lg:text-3xl font-medium leading-relaxed italic">
                {'"Грижиха се неуморно, с внимание, човечност и висок професионализъм за баща ми, който от лежащо състояние го вдигнаха на крака! За един месец направиха наистина чудеса."'}
              </p>
              <div className="flex items-center gap-4 mt-8">
                <div className="w-14 h-14 rounded-full bg-white/15 flex items-center justify-center">
                  <span className="text-lg font-bold">АЯ</span>
                </div>
                <div>
                  <p className="font-semibold text-lg">Антония Янкова</p>
                  <p className="text-white/70 text-sm">
                    Дъщеря на Константин Куртев
                  </p>
                </div>
                <div className="ml-auto hidden sm:flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 fill-accent text-accent"
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Reviews masonry grid */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {REVIEWS.map((review, index) => (
              <div key={review.name} className="break-inside-avoid">
                <ReviewCard review={review} index={index} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.97, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-center bg-primary/95 backdrop-blur-md rounded-3xl p-10 sm:p-14 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-72 h-72 bg-white/5 rounded-full -translate-y-1/2 -translate-x-1/2" />
            <div className="absolute bottom-0 right-0 w-56 h-56 bg-white/5 rounded-full translate-y-1/2 translate-x-1/2" />

            <div className="relative">
              <h3 className="font-serif text-2xl sm:text-3xl font-bold mb-4 text-white">
                Присъединете се към доволните семейства
              </h3>
              <p className="text-white/80 max-w-xl mx-auto mb-8 leading-relaxed">
                Свържете се с нас за безплатна консултация и научете как можем
                да помогнем на вашите близки.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="tel:+359878710501"
                  className="inline-flex items-center gap-2 rounded-lg px-8 py-3 text-base font-semibold bg-accent text-accent-foreground hover:bg-accent/90 transition-colors shadow-md"
                >
                  <Phone className="h-5 w-5" />
                  087 871 05 01
                </a>
                <a
                  href="tel:+359883920422"
                  className="inline-flex items-center gap-2 rounded-lg px-8 py-3 text-base font-semibold bg-white text-primary hover:bg-white/90 transition-colors shadow-md"
                >
                  <Phone className="h-5 w-5" />
                  088 392 04 22
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
