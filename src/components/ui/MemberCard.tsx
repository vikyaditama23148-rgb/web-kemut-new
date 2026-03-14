"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Instagram, ExternalLink } from "lucide-react";
import { Member } from "@/types";
import ProfilePhotoUpload from "./ProfilePhotoUpload";

interface MemberCardProps {
  member: Member;
  compact?: boolean;
  showUpload?: boolean;
  onPhotoUpdate?: (memberId: string, newUrl: string) => void;
}

export default function MemberCard({
  member,
  compact = false,
  showUpload = false,
  onPhotoUpdate,
}: MemberCardProps) {
  const [showFact, setShowFact] = useState(false);

  if (compact) {
    return (
      <motion.div
        whileHover={{ y: -4, rotate: 0.5 }}
        className="bg-white rounded-3xl cartoon-border p-5 text-center cursor-pointer group"
        onClick={() => setShowFact(!showFact)}
      >
        {/* Avatar */}
        <div className="relative mx-auto mb-3">
          <div
            className={`w-20 h-20 ${member.color} rounded-full cartoon-border mx-auto flex items-center justify-center text-4xl overflow-hidden`}
          >
            {member.photo_url ? (
              <Image
                src={member.photo_url}
                alt={member.name}
                width={80}
                height={80}
                className="w-full h-full object-cover"
              />
            ) : (
              <span>{member.roleEmoji}</span>
            )}
          </div>
        </div>
        <h3 className="font-black text-kemut-dark text-sm leading-tight mb-1">
          {member.name}
        </h3>
        <span className="kemut-tag text-xs">
          {member.roleEmoji} {member.role}
        </span>
      </motion.div>
    );
  }

  return (
    <motion.div
      layout
      whileHover={{ y: -6 }}
      className="bg-white rounded-3xl cartoon-border overflow-hidden group"
    >
      {/* Header */}
      <div className={`${member.color} p-6 relative`}>
        <div className="absolute top-3 right-3 text-2xl opacity-30 group-hover:opacity-70 transition-opacity">
          {member.roleEmoji}
        </div>

        {/* Photo */}
        <div className="relative w-28 h-28 mx-auto mb-3">
          <div className="w-28 h-28 rounded-full bg-white/30 cartoon-border overflow-hidden flex items-center justify-center text-5xl">
            {member.photo_url ? (
              <Image
                src={member.photo_url}
                alt={member.name}
                width={112}
                height={112}
                className="w-full h-full object-cover"
              />
            ) : (
              <span>{member.roleEmoji}</span>
            )}
          </div>
          {showUpload && onPhotoUpdate && (
            <ProfilePhotoUpload
              memberId={member.id}
              onUploadSuccess={(url) => onPhotoUpdate(member.id, url)}
            />
          )}
        </div>

        <h3 className="font-black text-kemut-dark text-xl text-center">
          {member.name}
        </h3>
      </div>

      {/* Body */}
      <div className="p-5">
        <span className="kemut-tag mb-4 block w-fit">
          {member.roleEmoji} {member.role}
        </span>

        <p className="text-kemut-brown text-sm leading-relaxed mb-4">
          {member.description}
        </p>

        {/* Fun fact toggle */}
        <button
          onClick={() => setShowFact(!showFact)}
          className="w-full py-2 px-4 bg-kemut-yellow/30 hover:bg-kemut-yellow rounded-xl text-sm font-bold text-kemut-dark transition-colors mb-3"
        >
          {showFact ? "🙈 Sembunyikan" : "🎉 Fun Fact!"}
        </button>

        {showFact && member.fun_fact && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-kemut-yellow/20 rounded-xl p-3 text-sm text-kemut-dark font-medium border-2 border-kemut-yellow"
          >
            💡 {member.fun_fact}
          </motion.div>
        )}

        {/* Social links */}
        {(member.instagram || member.tiktok) && (
          <div className="flex gap-2 mt-3">
            {member.instagram && (
              <a
                href={`https://instagram.com/${member.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2 bg-kemut-pink/10 hover:bg-kemut-pink hover:text-white text-kemut-pink rounded-xl text-xs font-bold flex items-center justify-center gap-1 transition-colors"
              >
                <Instagram size={14} /> Instagram
              </a>
            )}
            {member.tiktok && (
              <a
                href={`https://tiktok.com/@${member.tiktok}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2 bg-kemut-dark/10 hover:bg-kemut-dark hover:text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1 transition-colors"
              >
                <ExternalLink size={14} /> TikTok
              </a>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
