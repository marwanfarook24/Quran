export default interface userdata {
  name: string;
  id: string | number;
  moshaf: [
    {
      id: string
      server: string
      moshaf_type: number
      name: string
      surah_list: string
      surah_total: number
    }
  ];
}


