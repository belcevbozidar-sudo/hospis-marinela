import { motion } from "motion/react";
import { ChevronRight, Quote, Star, Heart, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { buildMeta } from "@/lib/seo.ts";
import {
  breadcrumbSchema,
  reviewsSchema,
} from "@/lib/structured-data.ts";
import { JsonLd } from "@/components/json-ld.tsx";

export const meta = () => buildMeta("/reviews");

type Review = {
  name: string;
  date: string;
  text: string;
  highlight?: string;
};

const REVIEWS: Review[] = [
  {
    name: "Илиян Илиев",
    date: "преди година",
    text: "Баба ми се нуждаеше от специализирана грижа в последните етапи на живота си заради напреднал Алцхаймер (пълно обездвижване). След дълго търсене се спрях на Хоспис Маринела. Трудно ми беше да се довери на някой със здравето на любим човек. Искам да споделя моя опит, който беше изключително позитивен. Хоспис Маринела (Веселка Терзийска, Кали Петрова и целия персонал) се грижеха за баба изключително добре.\n\nХигиената в хосписа е на високо ниво – когато и да ходех на посещение (дори извън дните за посещения), всичко беше чисто – баба беше с чисти дрехи, чаршафите бяха чисти и нямаше никаква миризма нито в стаите, нито в коридорите.\n\nБаба имаше седмично посещение от лекар, Веселка (собственичката) е медицинско лице и хосписът е регистриран като медицински център, което ни даваше допълнително спокойствие. Осигуриха ѝ всички необходими лекарства, а персоналът се отнасяше с невероятно внимание и търпение.\n\nИмаше възможност за видеовръзка през таблет, за да се чуваме и виждаме с нея, което беше чудесно. Изключително благодарни сме на Валя, Вена и Първолета, както и на всички останали от екипа. Горещо препоръчвам Хоспис Маринела на всеки, който търси качествени грижи и човечност.",
    highlight: "опитът ни беше изключително позитивен",
  },
  {
    name: "Boris Toskov",
    date: "преди година",
    text: "Искам да благодаря на целия екип на Хоспис Маринела и на г-жа Веселка Терзийска, за положените грижи за баба ми. Изключително коректни и отзивчиви, винаги са съдействали с каквото е необходимо и се стараеха да направят престоя на баба ми по-лек.",
    highlight: "Изключително коректни и отзивчиви",
  },
  {
    name: "Yavor Pomakov",
    date: "преди 10 месеца",
    text: "Благодаря на екипа на хоспис Маринела за осигуряването на едни изключително професионални грижи за моя баща. Помощта беше за цялото ни семейство, а отношението безкрайно внимателно. Препоръчвам на всички, които имат нужда да се обърнат към хоспис Маринела.",
    highlight: "изключително професионални грижи",
  },
  {
    name: "Стойчо Василев",
    date: "преди година",
    text: "Човек е трудно да се довери, когато става въпрос за живота и здравето на своите близки, но съм очарован от обстановката, човешкото отношение и професионализъм в хоспис Маринела!!! Благодаря ви от сърце за грижите и всеотдайността, които показвате всеки ден.",
    highlight: "очарован от обстановката и човешкото отношение",
  },
  {
    name: "Iva Petkova",
    date: "преди 8 месеца",
    text: "Много сме доволни от грижата, положена за нашата майка. Единствената забележка беше, че храната е била поднесена студена. Но, като цяло сме много доволни и пак бихме ползвали услугите на хоспис „Маринела“.",
    highlight: "като цяло сме много доволни",
  },
  {
    name: "Manq Nikolova",
    date: "преди година",
    text: "Здравейте, искаме да ви благодарим, че вече повече от година се грижите и поддържате здравето на баба ни, въпреки проблемното ѝ състояние. Благодарим ви, че така помогнахте на нас и на цялото ни семейство да приемем този тежък удар. Благодарим на управителите Калина Петрова и Веселка Терзийска, на всички от медицинския персонал и администрацията за съпричастността и разбирането! Желаем успех на всички ви в упражняването на тази трудна професия. С уважение: Катерина и Маня",
    highlight: "съпричастността и разбирането",
  },
  {
    name: "Райчо Даскалов",
    date: "преди година",
    text: "Майка ми беше приета в хоспис „Маринела“ с депресия. Дълги години живее сама. Не иска да идва в града, защото не й понася. След броени дни благодарение на грижите на целия екип и техният професионализъм, вече е добре. Много любезни, отзивчиви и сърцати хора. Добра обратна връзка. Благодарим за положените усилия и грижи на управителя г-жа Терзийска и целия екип на хосписа. Бъдете здрави. Препоръчвам на всеки, който има нужда от помощ в грижи за близки хора в труден момент от живота им.",
    highlight: "Много любезни, отзивчиви и сърцати хора",
  },
  {
    name: "Nikolinka Nikolova",
    date: "преди 2 години",
    text: "Честита Нова година 2024! Пишем с възможно най-голямата благодарност към целия ви екип. Помагате на семейството ни вече седем години, споделяте болката ни за втори път и искам да знаете, че затвърдихте вярата ни в съпричастността и добротата. Благодарим на Веселка Терзийска и Калина Петрова за това, че създадоха такова топло и професионално място, където близките ни са в сигурни ръце.",
    highlight: "затвърдихте вярата ни в добротата",
  },
  {
    name: "Вероника с ютуб 162",
    date: "преди година",
    text: "Трудно ми е да формулирам благодарността си в едно изречение към хората, полагащи грижи в Хоспис Маринела! Преди да настаним баба ми в хосписа изпитвах вина! Но сега съм спокойна и знам, че сме постъпили по най-правилния начин. Самата тя не спира да изказва благодарности към персонала и храната. Рехабилитаторите ежедневно я раздвижват, винаги е чиста и спретната. Благодаря Ви мили хора за грижите, които полагате за нашите близки!",
    highlight: "знам, че сме постъпили по най-правилния начин",
  },
  {
    name: "Антони Миленков",
    date: "преди 3 години",
    text: "Вчера приеха майка ми в Хоспис Маринела. На 83 години, в тежко общо състояние, неподвижна, без сили да стане от леглото, последните дни в дома си тя непрестанно се влошаваше, а последната вечер преди да я приемат в Хосписа по думите ѝ е била кошмарна. Днес бях при нея и бях поразен от промяната – лицето ѝ беше спокойно, стаята ѝ е светла и приветлива, а отношението на сестрите и санитарите я караше да се чувства сигурна и обгрижена. Благодаря на целия екип за топлото посрещане и професионалния старт на грижата.",
    highlight: "бях поразен от промяната и спокойствието",
  },
  {
    name: "Stoyan Evtimov",
    date: "преди година",
    text: "Изключително сърдечно и човешко отношение към пациентите. Винаги подхождат с разбиране и съдействие. Страхотни медицински специалисти с отношение към болните. Благодарим за всичко, което правите за нас и нашите близки!",
    highlight: "Изключително сърдечно и човешко отношение",
  },
  {
    name: "Десислaвa Стойневa",
    date: "преди 5 години",
    text: "Здравейте, наскоро се наложи да настаня баща ми в хоспис. Избрах „Маринела“ и искам да изкажа своите благодарности на Веселка Терзийска и Калина Петрова за топлото посрещане. Баща ми там се възстанови емоционално и физически. Персоналът е много любезен, отнася се изключително добре с пациентите. Храната се сервира точно на време и е в достатъчно количество. Горещо препоръчвам на бъдещи пациенти да се доверяват за грижи тук.",
    highlight: "възстанови се емоционално и физически",
  },
  {
    name: "Кръстьо Петков",
    date: "преди 8 години",
    text: "Прекрасни хора, които се грижат с душа и сърце за пациентите в „Хоспис Маринела“. Всички са лъчезарни и приятелски настроени. Радвам се, че поверих грижите за близък човек точно на тях. Не съм срещал по-приветлив екип. Чисто, светло, без никакви неприятни миризми и с перфектно поддържана хигиена.",
    highlight: "Грижат се с душа и сърце",
  },
  {
    name: "Boris Medarski",
    date: "преди 3 години",
    text: "Майка ми е в хоспис Маринела от 5 години. След претърпян инцидент и операции в Пирогов се възстанови там от изгаряне последна степен и получава всички нужни грижи, за да е добре. Благодарни сме за всички грижи, положени за нея. ♥️🙏",
    highlight: "получава всички нужни грижи",
  },
  {
    name: "Анета Йорданова",
    date: "преди 5 години",
    text: "Благодарим Ви за грижите, вниманието, съпричастността към нас. Госпожо Терзийска, госпожо Петрова, и вие – целият екип на хоспис Маринела, за да бъдете добри професионалисти, трябва да сте преди всичко хора, а вие сте първо ЧОВЕЦИ с големи сърца и след това всичко останало. Благодарим Ви! ❤",
    highlight: "вие сте първо ЧОВЕЦИ с големи сърца",
  },
  {
    name: "Vania Tonova",
    date: "преди 3 години",
    text: "Много човечно и разбиращо отношение към хората, настанени в хоспис Маринела, от страна на целия екип. Съдействат на пациента и неговите близки с каквото могат. Дават ежедневно обратна връзка.",
    highlight: "Много човечно и разбиращо отношение",
  },
  {
    name: "Hristo Vasilev",
    date: "преди 8 години",
    text: "Изказвам благодарност към управителите и екипа на Хоспис Маринела за грижите, които положиха за гледане и възстановяване на майка ми. Пожелавам им успехи в тази изключително отговорна професия.",
    highlight: "Благодарност за грижите и възстановяването",
  },
  {
    name: "Hristo Hristov",
    date: "преди година",
    text: "Благодаря за отдадеността и професионализма на целия екип, грижите, които полагаха за моята баба в продължение на година, са неоценими!",
    highlight: "грижите в продължение на година са неоценими",
  },
  {
    name: "Viktoriya Rumenova",
    date: "преди 2 години",
    text: "Много любезен и отзивчив персонал, грижат се за пациентите си с желание! Личи си, че са хора със сърца, спазват чудесна хигиена, порциите им са достатъчни, препоръчвам ги!",
    highlight: "грижат се за пациентите си с желание",
  },
  {
    name: "Daniela Hristova",
    date: "преди година",
    text: "Най-сърдечни благодарности на управителката Веселка Терзийска и целия екип за грижите за майка ми!",
    highlight: "Най-сърдечни благодарности на целия екип",
  },
  {
    name: "Neli Metodieva",
    date: "преди 5 години",
    text: "Изключително доволни сме от професионалното и личното отношение на управителите и персонала на хосписа. Благодарим за всички положени усилия и човещината, която показахте.",
    highlight: "професионално и лично отношение",
  },
  {
    name: "Sonq Petrova",
    date: "преди 6 години",
    text: "Прекрасно място. Прекрасен и добре подбран персонал. Благодаря Ви за грижите, които полагате!!!!!!",
    highlight: "Благодаря Ви за грижите",
  },
  {
    name: "Kat Hristova",
    date: "преди 2 дни",
    text: "Искам от сърце да изкажа своята благодарност към целия екип на Хоспис „Маринела“ за грижите, които положиха за моята майка. Още от първия ден тя беше посрещната с внимание, уважение и човечност. Специални благодарности на г-жа Веселка Терзийска и Калина Петрова за безупречната организация и моралната подкрепа, която оказват на семействата при справяне с деменция и тежки състояния. Екипът от медицински сестри и санитари е денонощно до пациентите с огромно сърце и професионализъм.",
    highlight: "посрещната с внимание, уважение и човечност",
  },
  {
    name: "Snejana Yordanova",
    date: "преди 6 дни",
    text: "Изказвам голямата си благодарност към екипа на хоспис „Маринела“ за професионализма и човешкото отношение към пациентите си. И в частност към мой роднина. Благодаря! Поздрави!",
    highlight: "благодарност за професионализма и човешкото отношение",
  },
  {
    name: "Алла",
    date: "преди месец",
    text: "Бих искал/а да благодаря на хоспис „Маринела“ за тяхната много професионална и състрадателна грижа за пациентите, независимо от диагнозата или националността им. Благодаря ви много.",
    highlight: "професионална и състрадателна грижа",
  },
];

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
        <Quote className="h-8 w-8 text-primary/20 mb-4 shrink-0" />

        <div className="flex gap-0.5 mb-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className="h-4 w-4 fill-accent text-accent"
            />
          ))}
        </div>

        {review.highlight && (
          <p className="text-primary font-serif text-lg sm:text-xl font-semibold italic mb-4 leading-snug">
            {`"${review.highlight}"`}
          </p>
        )}

        <p className="text-sm sm:text-base text-foreground/80 leading-relaxed flex-1 whitespace-pre-line">
          {review.text}
        </p>

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
              {review.date} • Близък на пациент
            </p>
          </div>
          <Heart className="h-4 w-4 text-red-400/60 ml-auto shrink-0" />
        </div>
      </div>
    </motion.div>
  );
}

export default function ReviewsPage() {
  return (
    <div>
      <JsonLd
        data={[
          breadcrumbSchema("Отзиви", "/reviews"),
          reviewsSchema(
            REVIEWS.map((r) => ({ author: r.name, text: r.text })),
          ),
        ]}
      />
      
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
              <Link
                to="/"
                className="hover:text-primary transition-colors cursor-pointer"
              >
                Начало
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-primary font-semibold">Отзиви</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white">
              Отзиви и мнения
            </h1>
            <p className="text-lg sm:text-xl text-white/95 mt-4 max-w-3xl mx-auto text-balance">
              Отзиви и споделени мнения от семейства и близки на нашите пациенти, публикувани в нашия Google бизнес профил за Хоспис Маринела.
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
              <div className="text-3xl sm:text-4xl font-bold text-white">
                {REVIEWS.length}
              </div>
              <div className="text-sm text-white/90 font-medium mt-1">
                Истински отзива
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
                Отлична оценка (5.0)
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-white">
                15+
              </div>
              <div className="text-sm text-white/90 font-medium mt-1">
                Години опит и грижа
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
            className="relative bg-primary/95 rounded-3xl p-8 sm:p-12 text-white overflow-hidden shadow-xl"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

            <div className="relative">
              <Quote className="h-12 w-12 text-white/20 mb-4" />
              <p className="font-serif text-xl sm:text-2xl lg:text-3xl font-medium leading-relaxed italic">
                {'"Хоспис Маринела (Веселка Терзийска, Кали Петрова и целия персонал) се грижеха за баба изключително добре. Хигиената е на високо ниво – всичко беше чисто и нямаше никаква миризма нито в стаите, нито в коридорите."'}
              </p>
              <div className="flex items-center gap-4 mt-8">
                <div className="w-14 h-14 rounded-full bg-white/15 flex items-center justify-center">
                  <span className="text-lg font-bold">ИИ</span>
                </div>
                <div>
                  <p className="font-semibold text-lg">Илиян Илиев</p>
                  <p className="text-white/70 text-sm">
                    Близък на пациент
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
              <div key={review.name + index} className="break-inside-avoid">
                <ReviewCard review={review} index={index} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Emotional banner */}
      <section className="py-8 sm:py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/30"
          >
            <img
              src="/assets/banner-grizha-s-vnimanie-i-sarce.webp"
              width={1600}
              height={1343}
              loading="lazy"
              decoding="async"
              alt="Не всяка грижа се измерва с лекарства — усмивката, добрата дума, подадената ръка и чувството за сигурност в Хоспис Маринела"
              className="w-full h-auto"
            />
          </motion.div>
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
