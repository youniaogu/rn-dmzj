export function init() {
  return {
    type: 'INIT',
  };
}

export function store(data) {
  return {
    type: 'STORE',
    data,
  };
}

export function loadMangaList() {
  return {
    type: 'LOAD_MANGA_LIST',
  };
}

export function loadMangaListCompletion(keys = [], data) {
  return {
    type: 'LOAD_MANGA_LIST_COMPLETION',
    keys,
    data,
  };
}

export function loadMangaInfo(id) {
  return {
    type: 'LOAD_MANGA_INFO',
    id,
  };
}

export function loadMangaInfoCompletion() {
  return {
    type: 'LOAD_MANGA_INFO_COMPLETION',
  };
}

export function loadMangaChapter(id, name) {
  return {
    type: 'LOAD_MANGA_CHAPTER',
    id,
    name,
  };
}

export function loadMangaChapterCompletion(id, data) {
  return {
    type: 'LOAD_MANGA_CHAPTER_COMPLETION',
    id,
    data,
  };
}

export function loadMangaPage(id, cid) {
  return {
    type: 'LOAD_MANGA_PAGE',
    id,
    cid,
  };
}

export function loadMangaPageCompletion(error, data) {
  return {
    type: 'LOAD_MANGA_PAGE_COMPLETION',
    error,
    data,
  };
}

export function searchManga(name) {
  return {
    type: 'SEARCH_MANGA',
    name,
  };
}

export function searchMangaCompletion(error, data) {
  return {
    type: 'SEARCH_MANGA_COMPLETION',
    error,
    data,
  };
}

export function asyncStorage() {
  return {
    type: 'ASYNC_STORAGE',
  };
}

export function asyncStorageCompletion() {
  return {
    type: 'ASYNC_STORAGE_COMPLETION',
  };
}

export function collect(id) {
  return {
    type: 'COLLECT',
    id,
  };
}

export function collectCompletion(error, list) {
  return {
    type: 'COLLECT_COMPLETION',
    error,
    list,
  };
}
