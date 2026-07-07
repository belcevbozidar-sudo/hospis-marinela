import { motion } from "motion/react";

const CONDITIONS_IMAGES = [
  {
    src: "/assets/file_nGP1HxB1a2nIgtITeAf75w2e.webp",
    alt: "Арт терапия с пациенти",
    label: "Седмична арт терапия",
  },
  {
    src: "/assets/file_HIG4Uj5TLP9xDlBbvTde5qA1.webp",
    alt: "Рисунка на лалета от пациент",
    label: "Творби на пациенти",
  },
  {
    src: "/assets/file_Rw7QTKkBNmBMUR0tVBtzbbFZ.webp",
    alt: "Рисунка на жена с гълъб",
    label: "Изкуство и вдъхновение",
  },
  {
    src: "/assets/file_ZTqNsnoQmvebS1Fo2ah4Zaf4.webp",
    alt: "Пациенти рисуват заедно",
    label: "Творчески занимания",
  },
  {
    src: "/assets/file_s3a3teFTBFoTmQukVJrO2OiA.webp",
    alt: "Декоративна рисунка от пациент",
    label: "Ръчна изработка",
  },
];

export default function ConditionsSection() {
  return (
    <section id="conditions" className="py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text side */}
          <motion.div
            initial={{ opacity: 0, x: -60, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <span className="text-primary font-semibold text-sm uppercase tracking-widest">
              Условия
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold mt-3 text-white leading-tight">
              Условия в Хоспис Маринела
            </h2>
            <div className="w-16 h-1 bg-accent rounded-full mt-4" />

            <p className="text-white/90 mt-6 leading-relaxed">
              Хоспис Маринела осигурява условия за грижа за пациентите, 
              близки до тези в комфортна домашна обстановка.
            </p>

            <p className="text-white/90 mt-4 leading-relaxed">
              Хосписът разполага с 60 многофункционални легла. Обстановката е модерна, 
              стаите са оборудвани с всички съвременни удобства, собствен санитарен възел, 
              интернет, телевизия.
            </p>

            <p className="text-white/90 mt-4 leading-relaxed">
              Храната е здравословна и диетична, съобразена с нуждите на пациентите 
              и включва закуска, обяд и вечеря.
            </p>

            <p className="text-white/90 mt-4 leading-relaxed">
              На разположение е апаратура, необходима за пациенти с тежки дихателни 
              заболявания, нуждаещи се постоянно от кислород.
            </p>

            <p className="text-white/90 mt-4 leading-relaxed">
              Седмично се провежда <strong className="text-white">арт терапия</strong> с 
              пациентите — творчески занимания, които стимулират емоционалното 
              благополучие, създават усещане за радост и общност.
            </p>

            {/* License badge */}
            <motion.div
              initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 p-5 bg-white/50 backdrop-blur-sm border border-white/40 rounded-xl"
            >
              <p className="text-sm font-semibold text-accent-foreground mb-1 flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-accent" />
                Лицензирано лечебно заведение
              </p>
              <p className="text-sm text-foreground/70">
                Хоспис Маринела е лицензирано специализирано лечебно заведение 
                в съответствие с чл. 40 от Закона за лечебните заведения. 
                Лицензът е издаден от Министерство на здравеопазването чрез 
                Столичната регионална здравна инспекция.
              </p>
            </motion.div>
          </motion.div>

          {/* Images grid */}
          <motion.div
            initial={{ opacity: 0, x: 60, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
            className="grid grid-cols-2 gap-4"
          >
            {/* Large hero image spanning full width */}
            <motion.div
              className="col-span-2"
              initial={{ opacity: 0, scale: 1.05, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <div className="relative rounded-2xl overflow-hidden shadow-lg">
                <img
                  src={CONDITIONS_IMAGES[0].src}
                  alt={CONDITIONS_IMAGES[0].alt}
                  className="w-full h-[260px] object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                  <span className="text-white text-sm font-medium">
                    {CONDITIONS_IMAGES[0].label}
                  </span>
                </div>
              </div>
            </motion.div>
            {/* Two images in a row */}
            {CONDITIONS_IMAGES.slice(1, 3).map((img, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.25 + index * 0.15 }}
                className="relative rounded-2xl overflow-hidden shadow-lg"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-[200px] object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                  <span className="text-white text-sm font-medium">
                    {img.label}
                  </span>
                </div>
              </motion.div>
            ))}
            {/* Two more images in a row */}
            {CONDITIONS_IMAGES.slice(3).map((img, index) => (
              <motion.div
                key={`bottom-${index}`}
                initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.55 + index * 0.15 }}
                className="relative rounded-2xl overflow-hidden shadow-lg"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-[200px] object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                  <span className="text-white text-sm font-medium">
                    {img.label}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
