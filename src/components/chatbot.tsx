import { useState, useRef, useEffect, useCallback } from "react";
import { MessageCircle, X, Send, Bot, User, Phone } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Spinner } from "@/components/ui/spinner.tsx";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const GREETING =
  "Здравейте! Аз съм виртуалният асистент на Хоспис Маринела. Как мога да ви помогна?";

// Local database of answers matching keywords
function getLocalResponse(userMessage: string): string {
  const msg = userMessage.toLowerCase().trim();
  
  if (msg.includes("цена") || msg.includes("цени") || msg.includes("такса") || msg.includes("таксу") || msg.includes("плащ") || msg.includes("струва") || msg.includes("пари") || msg.includes("бюджет") || msg.includes("сума") || msg.includes("евро") || msg.includes("лева") || msg.includes("таксата")) {
    return "Хосписът предлага дневен престой на цени между 50 и 70 € (97.40 – 136.36 лв.), в зависимост от състоянието на пациента и нуждите от грижи. Минималният престой е 10 дни.\n\nВ цената са включени: 24-часови грижи, лекарски визитации, сестрински грижи, три хранения, помощ при хигиена, почистване и памперси.\n\nНе са включени: лекарства и консумативи, извънредни консултации със специалисти.\n\nПлащането се извършва в брой или по банков път:\nБанка: Postbank\nТитуляр: ХОСПИС МАРИНЕЛА 2008 ООД\nIBAN: BG85BPBI81701603211823\nBIC: BPBIBGSF";
  }
  
  if (msg.includes("свиждане") || msg.includes("посещен") || msg.includes("кога мога") || msg.includes("време за") || msg.includes("час") || msg.includes("дни") || msg.includes("визита") || msg.includes("свиждания")) {
    return "Посещенията в хосписа са разрешени във вторник, четвъртък, събота и неделя от 16:00 до 19:30 ч. Посещенията НЕ са всеки ден, с цел осигуряване на спокойствие на настанените пациенти.";
  }
  
  if (msg.includes("адрес") || msg.includes("къде се намира") || msg.includes("къде сте") || msg.includes("локация") || msg.includes("транспорт") || msg.includes("автобус") || msg.includes("трамвай") || msg.includes("намери") || msg.includes("софия") || msg.includes("овча купел")) {
    return "Хоспис Маринела се намира в гр. София, кв. Овча купел, ул. 'Любляна' № 34Б.\nGPS координати: 42.671787, 23.260235\n\nМожете да стигнете до нас с градски транспорт:\n- Трамвай 4, 5, 11 — спирка 'кв. Павлово' (850 м пеш)\n- Автобус 111 — спирка 'бул. Никола Петков' (550 м пеш)\n- Автобус 60 — спирка '66-то СОУ' (350 м пеш)";
  }
  
  if (msg.includes("контакт") || msg.includes("телефон") || msg.includes("тел") || msg.includes("връзка") || msg.includes("имейл") || msg.includes("viber") || msg.includes("вайбър") || msg.includes("обад")) {
    return "Можете да се свържете с нашите управители:\n- Веселка Терзийска (Медицински управител & Viber): 087 871 05 01\n- Калина Петрова (Финансов управител): 088 392 04 22\n- Имейл: office@marinelahospis.com";
  }

  if (msg.includes("документ") || msg.includes("прием") || msg.includes("настаня") || msg.includes("какви вещи") || msg.includes("какво да нос") || msg.includes("как се приема") || msg.includes("настаняване") || msg.includes("епикриза")) {
    return "За прием в хосписа са необходими:\n- Епикриза от последното лечебно заведение\n- Налични изследвания и рецепти за медикаменти\n- Копие от документ за самоличност\n- ТЕЛК решение (ако има такова)\n\nПациентите трябва да носят лични вещи (гребен, кърпа, бельо, чехли, тоалетни принадлежности). Минималният престой е 10 дни.";
  }
  
  if (msg.includes("услуг") || msg.includes("гриж") || msg.includes("рехабилитац") || msg.includes("какво предлагате") || msg.includes("инсулт") || msg.includes("рак") || msg.includes("онко") || msg.includes("инжекц") || msg.includes("рана") || msg.includes("физио") || msg.includes("кинези") || msg.includes("подкрепа") || msg.includes("хранене")) {
    return "Предлагаме широк спектър от медицински и санитарни грижи:\n- 24/7 медицинско наблюдение и манипулации\n- Грижи за лежащо болни и палиативни грижи за онкоболни\n- Ентерално (сондажно) хранене\n- Инфузионна терапия (венозни вливания)\n- Кислородна терапия и лечение на дълбоки рани\n- Рехабилитация от квалифицирани рехабилитатори след инсулт и травми\n- Санитарни грижи (хранене, къпане, пране) и психологическа подкрепа.";
  }
  
  if (msg.includes("екип") || msg.includes("персонал") || msg.includes("доктор") || msg.includes("лекар") || msg.includes("управител") || msg.includes("шахов") || msg.includes("терзийска") || msg.includes("петрова") || msg.includes("сестра") || msg.includes("болногледач")) {
    return "Нашият екип включва:\n- Д-р Александър Шахов (Основен лекар-консултант, анестезиолог-реаниматор с 35+ г. опит, специализирал палиативна медицина в Лондон)\n- Веселка Терзийска (Медицински управител, здравен мениджър с опит в реанимация)\n- Калина Петрова (Финансов управител, създател на хосписа)\n- Анатоли Вълчев (Кинезитерапевт) и Петя Симеонова (Рехабилитатор)\nДенонощно на разположение са над 30 души медицински сестри и болногледачи.";
  }
  
  if (msg.includes("нзок") || msg.includes("каса") || msg.includes("клинич") || msg.includes("път") || msg.includes("безплатно") || msg.includes("държав")) {
    return "Хоспис Маринела НЕ работи с НЗОК (клинични пътеки). Това ни осигурява независимост и ни позволява да се грижим за пациентите без ограничение на сроковете, диагнозите или излишна администрация.";
  }
  
  if (msg.includes("услов") || msg.includes("стаи") || msg.includes("легла") || msg.includes("баня") || msg.includes("телевизор") || msg.includes("интернет") || msg.includes("wi-fi") || msg.includes("витоша")) {
    return "Хосписът разполага с 60 многофункционални легла в модерна и просторна сграда с южно изложение и гледка към Витоша. Стаите са уютни, с домашна атмосфера, собствен санитарен възел, безплатен интернет и индивидуален телевизор с кабелна телевизия.";
  }
  
  if (msg.includes("здраве") || msg.includes("здрасти") || msg.includes("добър ден") || msg.includes("добър вечер") || msg.includes("привет") || msg.includes("здравейте")) {
    return "Здравейте! Аз съм виртуалният асистент на Хоспис Маринела. С какво мога да ви помогна днес? Можете да ме попитате за цени, посещения, адрес, услуги или прием.";
  }
  
  return "Благодаря ви за въпроса! Тъй като съм автоматизиран асистент, за този специфичен въпрос е най-добре да се свържете с нас за индивидуален разговор:\n- 087 871 05 01 (Веселка Терзийска - медицински въпроси)\n- 088 392 04 22 (Калина Петрова - финансови въпроси)\nИли ни пишете на office@marinelahospis.com.";
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: GREETING },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, scrollToBottom]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "instant" });
        inputRef.current?.focus();
      }, 50);
    }
  }, [isOpen]);

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    // Add user message
    setMessages((prev) => [...prev, { role: "user", content: trimmed }]);
    setInput("");
    setIsLoading(true);

    // Simulate typing delay for premium natural feel
    setTimeout(() => {
      const response = getLocalResponse(trimmed);
      setMessages((prev) => [...prev, { role: "assistant", content: response }]);
      setIsLoading(false);
    }, 800 + Math.random() * 500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-3">
            <motion.a
              href="tel:0878710526"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.05 }}
              className="w-14 h-14 rounded-full bg-accent text-accent-foreground shadow-xl hover:bg-accent/90 flex items-center justify-center cursor-pointer transition-colors"
              aria-label="Обадете се на 0878710526"
            >
              <Phone className="h-6 w-6" />
            </motion.a>

            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              onClick={() => setIsOpen(true)}
              className="w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-xl hover:bg-primary/90 flex items-center justify-center cursor-pointer transition-colors"
              aria-label="Отворете чатбот"
            >
              <MessageCircle className="h-6 w-6" />
            </motion.button>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed bottom-6 right-6 z-50 w-[calc(100vw-3rem)] sm:w-[380px] max-h-[min(600px,calc(100vh-6rem))] flex flex-col rounded-2xl shadow-2xl border border-border overflow-hidden bg-background"
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3 bg-primary text-primary-foreground shrink-0">
              <div className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center">
                <Bot className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm leading-tight">
                  Хоспис Маринела
                </p>
                <p className="text-xs opacity-80">Виртуален асистент</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-white/15 flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Затворете чатбот"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 min-h-0">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.role === "assistant" && (
                    <div className="shrink-0 w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center mt-1">
                      <Bot className="h-4 w-4" />
                    </div>
                  )}
                  <div
                    className={`max-w-[75%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-line ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground rounded-br-md"
                        : "bg-muted text-foreground rounded-bl-md"
                    }`}
                  >
                    {msg.content}
                  </div>
                  {msg.role === "user" && (
                    <div className="shrink-0 w-7 h-7 rounded-full bg-accent/15 text-accent flex items-center justify-center mt-1">
                      <User className="h-4 w-4" />
                    </div>
                  )}
                </div>
              ))}

              {/* Loading state */}
              {isLoading && (
                <div className="flex gap-2 justify-start">
                  <div className="shrink-0 w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center mt-1">
                    <Bot className="h-4 w-4" />
                  </div>
                  <div className="bg-muted rounded-2xl rounded-bl-md px-4 py-3">
                    <Spinner />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="shrink-0 px-3 py-3 border-t border-border bg-background">
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Напишете въпрос..."
                  disabled={isLoading}
                  className="flex-1 bg-muted rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/30 disabled:opacity-50 transition-shadow"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer shrink-0"
                  aria-label="Изпратете"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
