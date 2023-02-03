-- Tipe Pegawai
-- Table
create table tipe_pegawai (
  "id" bigint generated by default as identity primary key,
  "nama" text not null,
  "createdAt" timestamp with time zone null default(now()),
  unique("nama")
);
-- Insert some data
insert into tipe_pegawai("nama") values ('Tetap'), ('Magang'), ('Outsourcing');

-- Status Pegawai
-- Table
create table status_pegawai (
  "id" bigint generated by default as identity primary key,
  "nama" text not null,
  "createdAt" timestamp with time zone null default(now()),
  unique("nama")
);
-- Insert some data
insert into status_pegawai("nama") values ('Aktif'), ('Cuti'), ('Pensiun'), ('PHK');

-- Instansi
-- Table
create table instansi (
  "id" bigint generated by default as identity primary key,
  "nama" text not null,
  "alamat" text not null,
  "createdAt" timestamp with time zone null default(now()),
  unique("nama")
);

-- Divisi
-- Table
create table divisi (
  "id" bigint generated by default as identity primary key,
  "nama" text not null,
  "idInstansi" bigint not null references public.instansi on delete cascade,
  "createdAt" timestamp with time zone null default(now()),
  unique("nama", "idInstansi")
);

-- Jabatan
-- Table
create table jabatan (
  "id" bigint generated by default as identity primary key,
  "nama" text not null,
  "idInstansi" bigint not null references public.instansi on delete cascade,
  "idDivisi" bigint not null references public.divisi on delete cascade,
  "createdAt" timestamp with time zone null default(now()),
  unique("nama", "idInstansi", "idDivisi")
);

-- Golongan
-- Table
create table golongan (
  "id" bigint generated by default as identity primary key,
  "nama" text not null,
  "keterangan" text null default (null),
  "createdAt" timestamp with time zone null default(now()),
  unique("nama")
);

-- Pegawai
-- Table
create table pegawai (
  "nip" bigint not null primary key,
  "nama" text not null,
  "email" text not null,
  "noTelepon" text not null,
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
  "tempatLahir" text not null,
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
  "nama" text not null,
  "jenjang" jenjang_pendidikan not null,
  "jurusan" text not null,
  "tahunMasuk" text not null,
  "tahunLulus" text not null, 
  "gelar" text null default('-'),
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
  "keterangan" text not null,
  "mulaiCuti" date not null,
  "selesaiCuti" date not null,
  "dokumen" jsonb null default '{}'::jsonb,
  "diterima" boolean null default(false),
  "nipPegawai" bigint not null references public.pegawai on delete cascade,
  "createdAt" timestamp with time zone null default(now())
);

-- Dokumen
-- Enum Types
create type kategori_dokumen as enum ('profil', 'pribadi', 'lamaran', 'pendidikan', 'mutasi', 'cuti', 'hukuman');
-- Table
create table dokumen (
  "id" bigint generated by default as identity primary key,
  "nama" text not null,
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
-- Cuti
create policy "CRUD (Only Admin)" on public.cuti as permissive for all to authenticated using (((get_my_claim('claims'::text)) = '"ADMIN"'::jsonb));
create policy "INSERT (Auth Users)" on public.cuti as permissive for insert to authenticated using (true);
create policy "READ (Auth Users)" on public.cuti as permissive for select to authenticated using (true);
create policy "READ (Functions)" on public.cuti as permissive for select to anon using (true);

-- Data Pribadi
create policy "CRUD (Only Admin)" on public.data_pribadi as permissive for all to authenticated using (((get_my_claim('claims'::text)) = '"ADMIN"'::jsonb));
create policy "READ (Auth Users)" on public.data_pribadi as permissive for select to authenticated using (true);

-- Divisi
create policy "CRUD (Only Admin)" on public.divisi as permissive for all to authenticated using (((get_my_claim('claims'::text)) = '"ADMIN"'::jsonb));
create policy "READ (Auth Users)" on public.divisi as permissive for select to authenticated using (true);

-- Dokumen
create policy "CRUD (Only Admin)" on public.dokumen as permissive for all to authenticated using (((get_my_claim('claims'::text)) = '"ADMIN"'::jsonb));
create policy "READ (Auth Users)" on public.dokumen as permissive for select to authenticated using (true);

-- Golongan
create policy "CRUD (Only Admin)" on public.golongan as permissive for all to authenticated using (((get_my_claim('claims'::text)) = '"ADMIN"'::jsonb));
create policy "READ (Auth Users)" on public.golongan as permissive for select to authenticated using (true);

-- Instansi
create policy "CRUD (Only Admin)" on public.instansi as permissive for all to authenticated using (((get_my_claim('claims'::text)) = '"ADMIN"'::jsonb));
create policy "READ (Auth Users)" on public.instansi as permissive for select to authenticated using (true);

-- Jabatan
create policy "CRUD (Only Admin)" on public.jabatan as permissive for all to authenticated using (((get_my_claim('claims'::text)) = '"ADMIN"'::jsonb));
create policy "READ (Auth Users)" on public.jabatan as permissive for select to authenticated using (true);

-- Mutasi
create policy "CRUD (Only Admin)" on public.mutasi as permissive for all to authenticated using (((get_my_claim('claims'::text)) = '"ADMIN"'::jsonb));
create policy "READ (Auth Users)" on public.mutasi as permissive for select to authenticated using (true);

-- Pegawai
create policy "CRUD (Only Admin)" on public.pegawai as permissive for all to authenticated using (((get_my_claim('claims'::text)) = '"ADMIN"'::jsonb));
create policy "READ (Auth Users)" on public.pegawai as permissive for select to authenticated using (true);
create policy "READ (Functions)" on public.pegawai as permissive for select to anon using (true);
create policy "UPDATE (Functions)" on public.pegawai as permissive for update to anon using (true);

-- Pendidikan
create policy "CRUD (Only Admin)" on public.pendidikan as permissive for all to authenticated using (((get_my_claim('claims'::text)) = '"ADMIN"'::jsonb));
create policy "READ (Auth Users)" on public.pendidikan as permissive for select to authenticated using (true);

-- Status Pegawai
create policy "CRUD (Only Admin)" on public.status_pegawai as permissive for all to authenticated using (((get_my_claim('claims'::text)) = '"ADMIN"'::jsonb));
create policy "READ (Auth Users)" on public.status_pegawai as permissive for select to authenticated using (true);
create policy "READ (Functions)" on public.status_pegawai as permissive for select to anon using (true);

-- Tipe Pegawai
create policy "CRUD (Only Admin)" on public.tipe_pegawai as permissive for all to authenticated using (((get_my_claim('claims'::text)) = '"ADMIN"'::jsonb));
create policy "READ (Auth Users)" on public.tipe_pegawai as permissive for select to authenticated using (true);

-- drop type jenis_kelamin;
-- drop type agama;
-- drop type jenjang_pendidikan;
-- drop type jenis_mutasi;
-- drop type kategori_dokumen;