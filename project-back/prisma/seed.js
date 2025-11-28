"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt = __importStar(require("bcrypt"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const prisma = new client_1.PrismaClient();
const uploadsDir = path_1.default.join(process.cwd(), 'uploads');
if (!fs_1.default.existsSync(uploadsDir)) {
    fs_1.default.mkdirSync(uploadsDir, { recursive: true });
}
async function main() {
    await prisma.savedImage.deleteMany();
    await prisma.user.deleteMany();
    await prisma.item.deleteMany();
    const hashedPassword = await bcrypt.hash('Test123!', 10);
    const testUser = await prisma.user.create({
        data: {
            name: 'Test User',
            email: 'test@test.com',
            password: hashedPassword,
            role: 'user',
        },
    });
    console.log('Test user created:', testUser.email);
    const sourcePath = '/opt/render/project/src/project-back/uploads/jewel.png';
    const timestamp = Date.now();
    const filename = `${timestamp}-jewel.png`;
    const destPath = path_1.default.join(uploadsDir, filename);
    fs_1.default.copyFileSync(sourcePath, destPath);
    await prisma.item.create({
        data: {
            name: 'Jewel PNG (seed)',
            imagePath: filename,
            imageMime: 'image/png',
            defaultSize: 30,
            category: 'strass',
        },
    });
    console.log('Seed completed: 1 item inserted with image file copied to uploads/');
    console.log('\n--- Test Credentials ---');
    console.log('Email: test@test.com');
    console.log('Password: Test123!');
}
main()
    .catch((e) => {
    console.error('Seed error:', e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map