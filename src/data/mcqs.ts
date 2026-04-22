export interface MCQ {
  id: number;
  subject: string;
  question: string;
  options: { label: string; text: string }[];
  answer: string;
  explanation?: string;
}

export const mcqs: MCQ[] = [
  // --- CHOLERA ---
  {
    id: 1, subject: "Cholera", question: "Helpful in the treatment of Cholera?", answer: "c",
    options: [{ label: "a", text: "Abrotanum" }, { label: "b", text: "Digitalis" }, { label: "c", text: "Choleratoxin" }, { label: "d", text: "Nitric acid" }]
  },
  {
    id: 2, subject: "Cholera", question: "What will we choose in Cholera?", answer: "a",
    options: [{ label: "a", text: "Camphor 200, Lachesis 200, Sulphur 200" }, { label: "b", text: "Bryonia 200, Dulcamara 200, Fluoric acid 200" }, { label: "c", text: "Nux vomica 200, Zinc met 200" }, { label: "d", text: "Alumina 200, Cina 200" }]
  },
  {
    id: 3, subject: "Cholera", question: "Frequently used remedies in Cholera?", answer: "b",
    options: [{ label: "a", text: "Digitalis, Ferrum met" }, { label: "b", text: "Ars-alb, Camphor, Cup-met, Verat. alb" }, { label: "c", text: "Acetic acid, Graphites" }, { label: "d", text: "Glonoine, Hepar sulph" }]
  },

  // --- VACCINATION ---
  {
    id: 4, subject: "Vaccination", question: "Collapse stage or convulsions after vaccination?", answer: "c",
    explanation: "Thuja Occidentalis is universally known as the leading anti-vaccinosis remedy in Homeopathy.",
    options: [{ label: "a", text: "Aconite" }, { label: "b", text: "Rhus tox" }, { label: "c", text: "Thuja occ." }, { label: "d", text: "Sulphur" }]
  },
  {
    id: 5, subject: "Vaccination", question: "Convulsions or collapse stage after vaccination?", answer: "a",
    options: [{ label: "a", text: "Thuja occ" }, { label: "b", text: "Staphysagria" }, { label: "c", text: "Arnica" }, { label: "d", text: "Ledum pal" }]
  },
  {
    id: 8, subject: "Vaccination", question: "Cough, whooping after vaccination?", answer: "b",
    options: [{ label: "a", text: "Spigelia" }, { label: "b", text: "Thuja occ." }, { label: "c", text: "Rumex" }, { label: "d", text: "Spongia" }]
  },
  {
    id: 17, subject: "Vaccination", question: "Eczema, itching eruptions after vaccination?", answer: "b",
    options: [{ label: "a", text: "Silicea" }, { label: "b", text: "Mezereum" }, { label: "c", text: "Rhus tox" }, { label: "d", text: "Nux vomica" }]
  },

  // --- PREGNANCY & LABOR ---
  {
    id: 9, subject: "Pregnancy & Labor", question: "Prevents death of children after birth; still born children?", answer: "c",
    options: [{ label: "a", text: "Cimicifuga" }, { label: "b", text: "Taraxacum" }, { label: "c", text: "Sepia" }, { label: "d", text: "Pulsatilla" }]
  },
  {
    id: 18, subject: "Pregnancy & Labor", question: "Prevents formation of placenta praevia?", answer: "c",
    options: [{ label: "a", text: "Arnica" }, { label: "b", text: "Kreosote" }, { label: "c", text: "Erigeron" }, { label: "d", text: "Belladonna" }]
  },
  {
    id: 20, subject: "Pregnancy & Labor", question: "Abortion, tendency to?", answer: "a",
    options: [{ label: "a", text: "Sabina" }, { label: "b", text: "Aconite" }, { label: "c", text: "Caulophyllum" }, { label: "d", text: "Borax" }]
  },
  {
    id: 23, subject: "Pregnancy & Labor", question: "Abortion, threatened, about 3rd month in warm blooded & old thin, scrawny women?", answer: "b",
    options: [{ label: "a", text: "Hepar sulph" }, { label: "b", text: "Secale cor" }, { label: "c", text: "Nitric acid" }, { label: "d", text: "Jatropha" }]
  },
  {
    id: 29, subject: "Pregnancy & Labor", question: "Abortion from fright or excitement?", answer: "c",
    options: [{ label: "a", text: "Ferrum met" }, { label: "b", text: "Sanguinaria" }, { label: "c", text: "Aconite nap" }, { label: "d", text: "Sepia" }]
  },
  {
    id: 34, subject: "Pregnancy & Labor", question: "Puerperal convulsions immediately after delivery?", answer: "c",
    options: [{ label: "a", text: "Allium cepa" }, { label: "b", text: "Rhus tox" }, { label: "c", text: "Amyl nit" }, { label: "d", text: "Nitric acid" }]
  },

  // --- RESPIRATORY ---
  {
    id: 10, subject: "Respiratory", question: "Cough, whooping?", answer: "d",
    options: [{ label: "a", text: "Bryonia" }, { label: "b", text: "Dulcamara" }, { label: "c", text: "Opium" }, { label: "d", text: "Drosera, Pertussin, Vaccininum" }]
  },
  {
    id: 11, subject: "Respiratory", question: "Croup?", answer: "a",
    options: [{ label: "a", text: "Phosphorus" }, { label: "b", text: "Sulphur" }, { label: "c", text: "Silicea" }, { label: "d", text: "Physostigma" }]
  },
  {
    id: 15, subject: "Respiratory", question: "Diphtheria?", answer: "c",
    options: [{ label: "a", text: "Nitric acid" }, { label: "b", text: "Bryonia" }, { label: "c", text: "Diphtherinum" }, { label: "d", text: "Belladonna" }]
  },
  {
    id: 154, subject: "Respiratory", question: "Asthma after suppressed eruptions?", answer: "d",
    options: [{ label: "a", text: "Osmium" }, { label: "b", text: "Kali iod" }, { label: "c", text: "Lycopodium" }, { label: "d", text: "Hepar sul" }]
  },
  {
    id: 376, subject: "Respiratory", question: "Asthma from anger?", answer: "a",
    options: [{ label: "a", text: "Ars.a, Cham" }, { label: "b", text: "Coffea" }, { label: "c", text: "Petroleum" }, { label: "d", text: "Agaricus" }]
  },

  // --- GENERAL / FEVER / AILMENTS ---
  {
    id: 12, subject: "General & Fever", question: "Debility?", answer: "b",
    explanation: "China is known for extreme debility, especially following the loss of vital fluids.",
    options: [{ label: "a", text: "Nux vom." }, { label: "b", text: "China" }, { label: "c", text: "Ruta" }, { label: "d", text: "Pulsatilla" }]
  },
  {
    id: 31, subject: "General & Fever", question: "African fever?", answer: "a",
    options: [{ label: "a", text: "Terebinth" }, { label: "b", text: "Erigeron" }, { label: "c", text: "Pix liquida" }, { label: "d", text: "Allium cepa" }]
  },
  {
    id: 58, subject: "General & Fever", question: "Fever, yellow?", answer: "a",
    options: [{ label: "a", text: "Arsenicum alb" }, { label: "b", text: "Chamomilla" }, { label: "c", text: "Colocynth" }, { label: "d", text: "Cimicifuga" }]
  },
  {
    id: 147, subject: "General & Fever", question: "Ailments after abuse of mercury?", answer: "d",
    options: [{ label: "a", text: "Urtica urens" }, { label: "b", text: "Rhododendron" }, { label: "c", text: "Sarsaparilla" }, { label: "d", text: "Manganum" }]
  },

  // --- NERVOUS SYSTEM / MIND ---
  {
    id: 151, subject: "Mind & Nervous System", question: "Anger or insults, suppressed bring on many ill-effects?", answer: "a",
    options: [{ label: "a", text: "Staphysagria" }, { label: "b", text: "Lobelia inf" }, { label: "c", text: "Opium" }, { label: "d", text: "Naja" }]
  },
  {
    id: 386, subject: "Mind & Nervous System", question: "Facial paralysis from wetting?", answer: "c",
    options: [{ label: "a", text: "Veratrum alb" }, { label: "b", text: "Dioscorea" }, { label: "c", text: "Caust, Rhus tox" }, { label: "d", text: "Sulphuric acid" }]
  },
  {
    id: 1016, subject: "Mind & Nervous System", question: "Memory, sudden loss of?", answer: "b",
    options: [{ label: "a", text: "Rhus tox" }, { label: "b", text: "Anacardium orient" }, { label: "c", text: "Spongia" }, { label: "d", text: "Dulcamara" }]
  },
  {
    id: 1017, subject: "Mind & Nervous System", question: "Memory deficient, child cannot be taught?", answer: "c",
    options: [{ label: "a", text: "Opium" }, { label: "b", text: "Jatropha" }, { label: "c", text: "Baryta carb" }, { label: "d", text: "Borax" }]
  },
  {
    id: 1023, subject: "Mind & Nervous System", question: "Mind, cannot concentrate, to read or to study?", answer: "b",
    options: [{ label: "a", text: "Graphites" }, { label: "b", text: "Ignatia" }, { label: "c", text: "Psorinum" }, { label: "d", text: "Lac can" }]
  },
  {
    id: 1440, subject: "Mind & Nervous System", question: "Brain fag of business men, nervousness and vertigo, worse lying down?", answer: "b",
    options: [{ label: "a", text: "Bromium" }, { label: "b", text: "Zincum phos" }, { label: "c", text: "Borax" }, { label: "d", text: "Bryonia" }]
  },
  {
    id: 3167, subject: "Mind & Nervous System", question: "Despondent, gloomy, has no desire to live, but lacks courage to commit suicide?", answer: "b",
    options: [{ label: "a", text: "Nux vom." }, { label: "b", text: "China" }, { label: "c", text: "Ant-crud." }, { label: "d", text: "Medo." }]
  },
  {
    id: 3404, subject: "Mind & Nervous System", question: "Desires to be let alone; wants to lie down and sleep?", answer: "c",
    options: [{ label: "a", text: "Ignatia" }, { label: "b", text: "Capsicum" }, { label: "c", text: "Gelsemium" }, { label: "d", text: "Silicea" }]
  },

  // --- GASTROINTESTINAL ---
  {
    id: 14, subject: "Gastrointestinal", question: "Diarrhea, emotional?", answer: "a",
    options: [{ label: "a", text: "Gelsemium, Arg-nit." }, { label: "b", text: "China" }, { label: "c", text: "Dulcamara" }, { label: "d", text: "Ferrum met." }]
  },
  {
    id: 385, subject: "Gastrointestinal", question: "Car sickness causes vomiting?", answer: "a",
    options: [{ label: "a", text: "Cocc, Nux v, Petrol" }, { label: "b", text: "Ammonium carb" }, { label: "c", text: "Berberis aqua" }, { label: "d", text: "Cina" }]
  },
  {
    id: 397, subject: "Gastrointestinal", question: "Diarrhea from fruit?", answer: "a",
    options: [{ label: "a", text: "Coloc, Ip, Nat-s, Puls, Verat.a, Ars.a, Bry" }, { label: "b", text: "Coffea" }, { label: "c", text: "Dioscorea" }, { label: "d", text: "Erigeron" }]
  },
  {
    id: 404, subject: "Gastrointestinal", question: "Diarrhea from boiled milk?", answer: "b",
    options: [{ label: "a", text: "Petroleum" }, { label: "b", text: "Nux m, Sep" }, { label: "c", text: "Platina" }, { label: "d", text: "Sepia" }]
  },
  {
    id: 2084, subject: "Gastrointestinal", question: "Jaundice?", answer: "a",
    options: [{ label: "a", text: "Myrica" }, { label: "b", text: "Ruta" }, { label: "c", text: "Ferum met" }, { label: "d", text: "Zinc phos" }]
  },

  // --- RHEUMATISM & JOINTS ---
  {
    id: 235, subject: "Rheumatism & Joints", question: "Gonorrhea, suppressed cause rheumatism?", answer: "a",
    options: [{ label: "a", text: "Sarsaparilla" }, { label: "b", text: "Coffea crud" }, { label: "c", text: "Corallium" }, { label: "d", text: "Cyclamen" }]
  },
  {
    id: 321, subject: "Rheumatism & Joints", question: "Rheumatism from suppressed gonorrhea?", answer: "c",
    options: [{ label: "a", text: "Aloes" }, { label: "b", text: "Ammonium carb" }, { label: "c", text: "Thuja occ" }, { label: "d", text: "Borax" }]
  },
  {
    id: 2088, subject: "Rheumatism & Joints", question: "Joints, stiff, sore to touch?", answer: "d",
    options: [{ label: "a", text: "Thuja" }, { label: "b", text: "Sanicula aqua" }, { label: "c", text: "Plumbum" }, { label: "d", text: "Stellaria m" }]
  },

  // --- GENITOURINARY ---
  {
    id: 387, subject: "Genitourinary", question: "Retention of urine from operation?", answer: "a",
    options: [{ label: "a", text: "Causticum" }, { label: "b", text: "Taraxacum" }, { label: "c", text: "Mezereum" }, { label: "d", text: "Sambucus nigra" }]
  },
  {
    id: 2718, subject: "Genitourinary", question: "Urine, scanty with heart disease?", answer: "d",
    explanation: "Eel serum is highly specific for oliguria combined with severe kidney/heart overlap syndromes.",
    options: [{ label: "a", text: "Borax" }, { label: "b", text: "Thuja" }, { label: "c", text: "Spigelia" }, { label: "d", text: "Eel serum" }]
  },
  {
    id: 2721, subject: "Genitourinary", question: "Urine, profuse and watery day and night without any cause?", answer: "b",
    options: [{ label: "a", text: "Opium" }, { label: "b", text: "Equisetum hy" }, { label: "c", text: "Aloe" }, { label: "d", text: "Helonias dioica" }]
  },
  {
    id: 3377, subject: "Genitourinary", question: "Constant desire to urinate with large quantity of clear watery urine?", answer: "a",
    options: [{ label: "a", text: "Apis" }, { label: "b", text: "Equisetum" }, { label: "c", text: "Cantharis" }, { label: "d", text: "Sarsaparilla" }]
  },
  
  // --- SKIN & TISSUES ---
  {
    id: 256, subject: "Skin & Tissues", question: "Itch checked by mercurial or sulphur requires?", answer: "a",
    options: [{ label: "a", text: "Raphanus" }, { label: "b", text: "Selenium" }, { label: "c", text: "Vinca minor" }, { label: "d", text: "Merc sol" }]
  },
  {
    id: 326, subject: "Skin & Tissues", question: "Scrofulous, psoric, chronic diseases that results from suppressed eruptions?", answer: "a",
    options: [{ label: "a", text: "Sulphur" }, { label: "b", text: "Belladonna" }, { label: "c", text: "Bryonia alb" }, { label: "d", text: "Cina" }]
  },
  {
    id: 1428, subject: "Skin & Tissues", question: "Boils in crops very painful?", answer: "b",
    options: [{ label: "a", text: "Ledum pal" }, { label: "b", text: "Tuberc." }, { label: "c", text: "Natrum mur" }, { label: "d", text: "Strichninum" }]
  },
  {
    id: 1578, subject: "Skin & Tissues", question: "Corns and bunions when pain is excruciating?", answer: "a",
    options: [{ label: "a", text: "Hypericum" }, { label: "b", text: "Opium" }, { label: "c", text: "Nitric acid" }, { label: "d", text: "Aconitum" }]
  },

  // --- SURGICAL / TRAUMA ---
  {
    id: 225, subject: "Surgical / Trauma", question: "Fish bones, needles and splinters, to expel from the body tissue?", answer: "a",
    options: [{ label: "a", text: "Silicea" }, { label: "b", text: "Alumina" }, { label: "c", text: "Conium mac" }, { label: "d", text: "Opium" }]
  },
  {
    id: 522, subject: "Surgical / Trauma", question: "Surgical shock from operation?", answer: "a",
    options: [{ label: "a", text: "Petroleum" }, { label: "b", text: "Phosphoric acid" }, { label: "c", text: "Strontia carb" }, { label: "d", text: "Pyrogenium" }]
  },
  {
    id: 1461, subject: "Surgical / Trauma", question: "Burns of 1st and 2nd degree with burning sensation?", answer: "a",
    explanation: "Cantharis is famous for burns where there is burning, blistering pain.",
    options: [{ label: "a", text: "Cantharis" }, { label: "b", text: "Graphites" }, { label: "c", text: "Ipecacuanha" }, { label: "d", text: "Crotalus hor" }]
  },

  // --- EYES & VISION ---
  {
    id: 1580, subject: "Eyes & Vision", question: "Corneal opacity?", answer: "c",
    options: [{ label: "a", text: "Nux mos" }, { label: "b", text: "Carbo veg" }, { label: "c", text: "Silicea" }, { label: "d", text: "Nux vom." }]
  },
  {
    id: 3371, subject: "Eyes & Vision", question: "Eyelids puffy, swollen, edematous?", answer: "c",
    options: [{ label: "a", text: "Phosphorus" }, { label: "b", text: "Kali carb" }, { label: "c", text: "Apis" }, { label: "d", text: "Stramonium" }]
  }
];

export const subjects = Array.from(new Set(mcqs.map((m) => m.subject))).sort();

