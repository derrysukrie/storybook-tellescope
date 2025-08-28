export const data: Array<{
    name: string
    careTeam: string[]
    shareWith: string[]
    journeys: string[]
    tags: string[]
}> = [
    {
        name: 'chompy',
        careTeam: ['nom', 'bobba', 'rice'],
        shareWith: ['organization'],
        journeys: ['synt to healthie', 'content campaign'],
        tags: ['added to tellescope'],
    },
    {
        name: 'quacks',
        careTeam: ['chompy', 'fungi', 'bok'],
        shareWith: ['organization'],
        journeys: ['synt to healthie', 'content campaign'],
        tags: ['added to tellescope'],
    },
    {
        name: 'jumpy',
        careTeam: ['rice', 'jumpy', 'nom'],
        shareWith: ['organization'],
        journeys: ['synt to healthie', 'content campaign'],
        tags: ['added to tellescope'],
    },
    {
        name: 'fungi',
        careTeam: ['quacks', 'chompy', 'rice'],
        shareWith: ['organization'],
        journeys: ['synt to healthie', 'content campaign'],
        tags: ['added to tellescope'],
    },
    {
        name: 'bok',
        careTeam: ['chompy', 'fungi', 'quacks'],
        shareWith: ['organization'],
        journeys: ['synt to healthie', 'content campaign'],
        tags: ['added to tellescope'],
    },
    {
        name: 'nom',
        careTeam: ['fungi', 'bobba', 'jumpy'],
        shareWith: ['organization'],
        journeys: ['synt to healthie', 'content campaign'],
        tags: ['added to tellescope'],
    },
    {
        name: 'rice',
        careTeam: ['bobba', 'chompy', 'jumpy'],
        shareWith: ['organization'],
        journeys: ['synt to healthie', 'content campaign'],
        tags: ['added to tellescope'],
    },
    {
        name: 'bobba',
        careTeam: ['quacks', 'fungi', 'bok'],
        shareWith: ['organization'],
        journeys: ['synt to healthie', 'content campaign'],
        tags: ['added to tellescope'],
    },
    {
        name: 'crusts',
        careTeam: ['meows', 'slimes', 'rok'],
        shareWith: ['organization'],
        journeys: ['synt to healthie', 'content campaign'],
        tags: ['added to tellescope'],
    },
    {
        name: 'meows',
        careTeam: ['trunks', 'meows', 'gills'],
        shareWith: ['organization'],
        journeys: ['synt to healthie', 'content campaign'],
        tags: ['added to tellescope'],
    },
    {
        name: 'gills',
        careTeam: ['cakes', 'crusts', 'slimes'],
        shareWith: ['organization'],
        journeys: ['synt to healthie', 'content campaign'],
        tags: ['added to tellescope'],
    },
    {
        name: 'slimes',
        careTeam: ['trunks', 'gills', 'meows'],
        shareWith: ['organization'],
        journeys: ['synt to healthie', 'content campaign'],
        tags: ['added to tellescope'],
    },
    {
        name: 'rok',
        careTeam: ['slimes', 'meows', 'crusts'],
        shareWith: ['organization'],
        journeys: ['synt to healthie', 'content campaign'],
        tags: ['added to tellescope'],
    },
    {
        name: 'trunks',
        careTeam: ['cakes', 'meows', 'gills'],
        shareWith: ['organization'],
        journeys: ['synt to healthie', 'content campaign'],
        tags: ['added to tellescope'],
    },
    {
        name: 'cakes',
        careTeam: ['trunks', 'rok', 'gills'],
        shareWith: ['organization'],
        journeys: ['synt to healthie', 'content campaign'],
        tags: ['added to tellescope'],
    },
    // Repeated "name"
    ...Array.from({ length: 9 }).map(() => ({
        name: 'name',
        careTeam: ['trunks', 'rok', 'gills'],
        shareWith: ['organization'],
        journeys: ['synt to healthie', 'content campaign'],
        tags: ['added to tellescope'],
    })),
    {
        name: 'boba',
        careTeam: ['trunks', 'rok', 'gills'],
        shareWith: ['organization'],
        journeys: ['synt to healthie', 'content campaign'],
        tags: ['added to tellescope'],
    },
]
