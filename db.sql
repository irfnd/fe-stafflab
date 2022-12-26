-- Tipe Pegawai
-- Table
create table tipe_pegawai (
  "id" bigint generated by default as identity primary key,
  "nama" varchar not null,
  "createdAt" timestamp with time zone null default(now()),
  unique("nama")
);
-- Insert some data
insert into tipe_pegawai("nama") values ('Tetap'), ('Magang'), ('Outsourcing');

-- Status Pegawai
-- Table
create table status_pegawai (
  "id" bigint generated by default as identity primary key,
  "nama" varchar not null,
  "createdAt" timestamp with time zone null default(now()),
  unique("nama")
);
-- Insert some data
insert into status_pegawai("nama") values ('Aktif'), ('Cuti'), ('Pensiun'), ('PHK');

-- Instansi
-- Table
create table instansi (
  "id" bigint generated by default as identity primary key,
  "nama" varchar not null,
  "alamat" text not null,
  "createdAt" timestamp with time zone null default(now()),
  unique("nama")
);

-- Divisi
-- Table
create table divisi (
  "id" bigint generated by default as identity primary key,
  "nama" varchar not null,
  "idInstansi" bigint not null references public.instansi on delete cascade,
  "createdAt" timestamp with time zone null default(now()),
  unique("nama", "idInstansi")
);

-- Jabatan
-- Table
create table jabatan (
  "id" bigint generated by default as identity primary key,
  "nama" varchar not null,
  "idInstansi" bigint not null references public.instansi on delete cascade,
  "idDivisi" bigint not null references public.divisi on delete cascade,
  "createdAt" timestamp with time zone null default(now()),
  unique("nama", "idInstansi", "idDivisi")
);

-- Golongan
-- Table
create table golongan (
  "id" bigint generated by default as identity primary key,
  "nama" varchar not null,
  "keterangan" text null default (null),
  "createdAt" timestamp with time zone null default(now()),
  unique("nama")
);

-- Pegawai
-- Table
create table pegawai (
  "nip" bigint not null primary key,
  "nama" varchar not null,
  "email" varchar not null,
  "noTelepon" varchar not null,
  "idTipe" bigint not null references public.tipe_pegawai,
  "idStatus" bigint not null references public.status_pegawai,
  "idInstansi" bigint not null references public.instansi on delete cascade,
  "idDivisi" bigint not null references public.divisi on delete cascade,
  "idJabatan" bigint not null references public.jabatan on delete cascade,
  "idGolongan" bigint not null references public.golongan,
  "uuidUser" uuid not null references auth.users on delete cascade,
  "createdAt" timestamp with time zone null default(now()),
  unique("nama", "email", "noTelepon", "uuidUser")
);

-- Data Pribadi
-- Enum Types
create type jenis_kelamin as enum ('l', 'p');
create type agama as enum ('islam', 'kristen', 'katholik', 'hindu', 'budha', 'khonghucu');
-- Table
create table data_pribadi (
  "nik" bigint not null primary key,
  "tempatLahir" varchar not null,
  "tanggalLahir" date not null,
  "jenisKelamin" jenis_kelamin not null,
  "agama" agama not null,
  "kawin" boolean null default(false),
  "alamat" text not null,
  "nipPegawai" bigint not null references public.pegawai on delete cascade,
  "createdAt" timestamp with time zone null default(now()),
  unique("nipPegawai")
);

-- Pendidikan
-- Enum Types
create type jenjang_pendidikan as enum ('SMK/SMA/MA', 'D3', 'S1', 'S2', 'S3');
-- Table
create table pendidikan (
  "id" bigint generated by default as identity primary key,
  "nama" varchar not null,
  "jenjang" jenjang_pendidikan not null,
  "jurusan" varchar not null,
  "tahunMasuk" varchar not null,
  "tahunLulus" varchar not null, 
  "gelar" varchar null default('-'),
  "dokumen" jsonb not null,
  "nipPegawai" bigint not null references public.pegawai on delete cascade,
  "createdAt" timestamp with time zone null default(now())
);

-- Mutasi
-- Enum Types
create type jenis_mutasi as enum ('jabatan', 'divisi', 'instansi', 'golongan', 'pengangkatan', 'pensiun', 'phk');
-- Table
create table mutasi (
  "id" bigint generated by default as identity primary key,
  "jenisMutasi" jenis_mutasi not null,
  "tanggalMutasi" date not null,
  "detail" jsonb not null,
  "dokumen" jsonb not null,
  "nipPegawai" bigint not null references public.pegawai on delete cascade,
  "createdAt" timestamp with time zone null default(now())
);

-- Cuti
-- Table
create table cuti (
  "id" bigint generated by default as identity primary key,
  "keterangan" varchar not null,
  "mulaiCuti" date not null,
  "selesaiCuti" date not null,
  "dokumen" jsonb not null,
  "nipPegawai" bigint not null references public.pegawai on delete cascade,
  "createdAt" timestamp with time zone null default(now())
);

-- Dokumen
-- Enum Types
create type kategori_dokumen as enum ('profil', 'pribadi', 'lamaran', 'pendidikan', 'mutasi', 'cuti', 'hukuman');
-- Table
create table dokumen (
  "id" bigint generated by default as identity primary key,
  "nama" varchar not null,
  "kategori" kategori_dokumen not null,
  "detail" jsonb not null,
  "nipPegawai" bigint not null references public.pegawai on delete cascade,
  "uploadedAt" timestamp with time zone null default(now())
);


-- Enable RLS
alter table tipe_pegawai enable row level security;
alter table status_pegawai enable row level security;
alter table instansi enable row level security;
alter table divisi enable row level security;
alter table jabatan enable row level security;
alter table golongan enable row level security;
alter table pegawai enable row level security;
alter table data_pribadi enable row level security;
alter table pendidikan enable row level security;
alter table mutasi enable row level security;
alter table cuti enable row level security;
alter table dokumen enable row level security;

-- Set RLS Policies
create policy "CRUD (Only Admin)"
  on public.tipe_pegawai as permissive for all to authenticated
  using (((get_my_claim('claims'::text)) = '"ADMIN"'::jsonb));

create policy "CRUD (Only Admin)"
  on public.status_pegawai as permissive for all to authenticated
  using (((get_my_claim('claims'::text)) = '"ADMIN"'::jsonb));

create policy "CRUD (Only Admin)"
  on public.instansi as permissive for all to authenticated
  using (((get_my_claim('claims'::text)) = '"ADMIN"'::jsonb));

create policy "CRUD (Only Admin)"
  on public.divisi as permissive for all to authenticated
  using (((get_my_claim('claims'::text)) = '"ADMIN"'::jsonb));

create policy "CRUD (Only Admin)"
  on public.jabatan as permissive for all to authenticated
  using (((get_my_claim('claims'::text)) = '"ADMIN"'::jsonb));

create policy "CRUD (Only Admin)"
  on public.golongan as permissive for all to authenticated
  using (((get_my_claim('claims'::text)) = '"ADMIN"'::jsonb));

create policy "CRUD (Only Admin)"
  on public.pegawai as permissive for all to authenticated
  using (((get_my_claim('claims'::text)) = '"ADMIN"'::jsonb));

create policy "CRUD (Only Admin)"
  on public.data_pribadi as permissive for all to authenticated
  using (((get_my_claim('claims'::text)) = '"ADMIN"'::jsonb));

create policy "CRUD (Only Admin)"
  on public.pendidikan as permissive for all to authenticated
  using (((get_my_claim('claims'::text)) = '"ADMIN"'::jsonb));

create policy "CRUD (Only Admin)"
  on public.mutasi as permissive for all to authenticated
  using (((get_my_claim('claims'::text)) = '"ADMIN"'::jsonb));

create policy "CRUD (Only Admin)"
  on public.cuti as permissive for all to authenticated
  using (((get_my_claim('claims'::text)) = '"ADMIN"'::jsonb));

create policy "CRUD (Only Admin)"
  on public.dokumen as permissive for all to authenticated
  using (((get_my_claim('claims'::text)) = '"ADMIN"'::jsonb));

-- drop type jenis_kelamin;
-- drop type agama;
-- drop type jenjang_pendidikan;
-- drop type jenis_mutasi;
-- drop type kategori_dokumen;