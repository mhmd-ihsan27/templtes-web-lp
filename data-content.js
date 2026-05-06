const WEDDING_DATA = {
  // ─── Global Info ──────────────────────────────────
  groom: {
    fullName: "Rafi Ahmad",
    nickName: "Rafi",
    image: "groom.png",
    parents: {
      father: "Bapak H. Ahmad Sudirman",
      mother: "Ibu Hj. Siti Aminah"
    },
    instagram: "@rafiahmad",
    igLink: "https://instagram.com/rafiahmad"
  },
  bride: {
    fullName: "Salsabila Putri",
    nickName: "Salsabila",
    image: "bride.png",
    parents: {
      father: "Bapak H. Kurniawan",
      mother: "Ibu Hj. Ratna Sari"
    },
    instagram: "@salsabila_p",
    igLink: "https://instagram.com/salsabila_p"
  },

  // ─── Hero Section ─────────────────────────────────
  hero: {
    openingImage: "opening.png",
    centerDecor: "image-center.png",
    label: "The Wedding of",
    dividerLabel: "Bersatu dalam Cinta",
    date: "Sabtu, 14 Juni 2026",
    time: "Pukul 10.00 WIB — Selesai",
    venueShort: "Grand Ballroom The Ritz-Carlton, Jakarta",
    bottomInviteLabel: "Dengan penuh kebahagiaan, kami mengundang kehadiran anda",
    countdownDate: "2026-06-14T10:00:00" // Format: YYYY-MM-DDTHH:mm:ss
  },

  // ─── Couple Greeting (Quran/Quote) ────────────────
  greeting: {
    title: "Assalamu'alaikum Warahmatullahi Wabarakatuh",
    quote: "\"Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang.\"",
    cite: "( QS. Ar-Rum: 21 )"
  },

  // ─── Love Story Section ───────────────────────────
  loveStory: {
    title: "The Love Story",
    intro: "Setiap perjalanan cinta adalah unik, dan inilah penggalan kisah indah yang menyatukan kami dalam satu ikatan suci.",
    milestones: [
      {
        year: "Awal Berjumpa — 2021",
        title: "Pertemuan Pertama",
        image: "assets/story/meeting.png",
        content: "\"Di sebuah sore yang tenang, takdir mempertemukan kami di sebuah perpustakaan kota. Sebuah percakapan singkat tentang buku favorit yang menjadi awal dari segalanya.\""
      },
      {
        year: "Menjalin Kasih — 2023",
        title: "Berbagi Mimpi",
        image: "assets/story/dreams.png",
        content: "\"Dua tahun berlalu, kami menyadari bahwa kami tak hanya berbagi hobi, tapi juga visi masa depan. Setiap tantangan kami lalui bersama, menguatkan akar cinta kami.\""
      },
      {
        year: "Satu Komitmen — 2026",
        title: "Menuju Pelaminan",
        image: "assets/story/commitment.png",
        content: "\"Kini, kami siap melangkah ke babak baru. Membangun istana kecil yang penuh dengan keberkahan dan kasih sayang yang tak lekang oleh waktu.\""
      }
    ]
  },

  // ─── Event Section ────────────────────────────────
  event: {
    title: "Informasi Acara",
    subtitle: "Kebahagiaan kami akan lengkap dengan kehadiran Bapak/Ibu/Saudara/i",
    venueTitle: "Tempat & Waktu",
    date: "Sabtu, 14 Juni 2026",
    timeline: [
      { time: "08.00 — 10.00", label: "Akad Nikah" },
      { time: "10.00 — 11.00", label: "Ramah Tamah" },
      { time: "11.00 — 14.00", label: "Resepsi" }
    ]
  },

  // ─── RSVP Section ─────────────────────────────────
  rsvp: {
    title: "Konfirmasi Kehadiran",
    subtitle: "Merupakan kehormatan bagi kami atas konfirmasi kehadiran Anda.",
    labels: {
      name: "Nama Lengkap",
      attendance: "Kehadiran",
      guests: "Jumlah Tamu",
      submit: "Kirim Konfirmasi"
    }
  }
};

// Exporting if using modules (optional, but good practice)
if (typeof module !== 'undefined') module.exports = WEDDING_DATA;
