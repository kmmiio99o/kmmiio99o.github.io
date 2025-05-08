// StaffTagsOnLeaderboard - Plugin dla Vendetta/Revenge/Bunny
// Pokazuje tagi staffu obok nazw użytkowników na leaderboardzie

// Metadane pluginu
export const name = "Staff Tags";
export const description = "Adds staff tags next to usernames on the leaderboard.";
export const version = "1";
export const author = "kmmiio99o.dev";

const { React, channels } = vendetta;
const { findByProps } = vendetta.metro;
const { getModule } = vendetta.webpack;

const UserStore = getModule(m => m.getCurrentUser);
const GuildMemberStore = getModule(m => m.getMember);

// Znajdź komponent Leaderboard
const Leaderboard = findByProps("renderItem")?.renderItem?.type;

// Funkcja sprawdzająca czy użytkownik jest staffem
function isStaff(member) {
    if (!member) return false;
    return member.roles.some(role => 
        role.name.toLowerCase().includes("staff") || 
        role.name.toLowerCase().includes("admin") ||
        role.name.toLowerCase().includes("moderator")
    );
}

// Funkcja dodająca tag staffu
function addStaffTag(originalName, userId, guildId) {
    const member = GuildMemberStore.getMember(guildId, userId);
    if (isStaff(member)) {
        return `${originalName} [STAFF]`;
    }
    return originalName;
}

// Patchowanie komponentu Leaderboard
const unpatch = vendetta.patcher.after("render", Leaderboard, (args, res) => {
    const { leaderboardItem: item, guildId } = args[0];
    
    if (!item || !res?.props?.children) return;
    
    try {
        const nameComponent = res.props.children.find(c => c?.type?.name === "Text");
        if (nameComponent) {
            nameComponent.props.children = addStaffTag(
                nameComponent.props.children, 
                item.userId, 
                guildId
            );
        }
    } catch (e) {
        console.error("StaffTagsOnLeaderboard error:", e);
    }
});

// Eksport pluginów
export const onUnload = () => unpatch?.();